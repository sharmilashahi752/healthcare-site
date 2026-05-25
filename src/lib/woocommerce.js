import { products as mockProducts } from '../app/data/products';

const baseUrl = (process.env.WOOCOMMERCE_URL || 'https://api.tejasmanyata.com.np').replace(/\/$/, '');
const username = process.env.WOOCOMMERCE_CK || '';
const password = process.env.WOOCOMMERCE_CS || '';
const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

/**
 * Generic fetcher for WooCommerce REST API
 */
export async function wcFetch(endpoint, options = {}) {
  const url = `${baseUrl}/wp-json/wc/v3/${endpoint.replace(/^\//, '')}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
      'User-Agent': 'TejasManyata-NextJS/1.0',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`WooCommerce API error on ${endpoint}:`, response.status, errorText);
    throw new Error(`WooCommerce API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}

/**
 * Normalizes WooCommerce category object to frontend slug/name
 */
function getCategoryInfo(wcCategories) {
  if (!wcCategories || wcCategories.length === 0) {
    return { category: 'surgical', categoryName: 'Surgical Items' };
  }

  // Look for any category matching our defined slugs
  const validSlugs = ['infant-formula', 'supplements', 'cosmeceuticals', 'surgical'];
  const matched = wcCategories.find(c => validSlugs.includes(c.slug));

  if (matched) {
    return {
      category: matched.slug,
      categoryName: matched.name
    };
  }

  // Fallback to first category or default
  return {
    category: wcCategories[0].slug || 'surgical',
    categoryName: wcCategories[0].name || 'Surgical Items'
  };
}

/**
 * Normalizes a WooCommerce product into our frontend schema
 */
export function normalizeProduct(wcProd) {
  const { category, categoryName } = getCategoryInfo(wcProd.categories);
  
  // Find matching template in mock products (either by exact name or by category)
  const exactMatch = mockProducts.find(p => p.name.toLowerCase() === wcProd.name.toLowerCase());
  const categoryMatch = mockProducts.find(p => p.category === category) || mockProducts[0];
  const template = exactMatch || categoryMatch;

  // Image mapping
  let imageUrl = '/images/default.png';
  if (wcProd.images && wcProd.images.length > 0) {
    imageUrl = wcProd.images[0].src;
  } else if (template.image) {
    imageUrl = template.image;
  }

  // Parse prices
  const price = parseFloat(wcProd.price || 0) || template.price;
  const originalPrice = parseFloat(wcProd.regular_price || 0) || template.originalPrice || price;

  // Parse rating
  const rating = parseFloat(wcProd.average_rating || 0) || template.rating || 5.0;
  const ratingCountRaw = parseInt(wcProd.rating_count || 0, 10);
  const ratingCount = ratingCountRaw > 0 ? `${ratingCountRaw}+ reviews` : (template.ratingCount || '50+ reviews');

  // Strip description HTML
  const rawDesc = wcProd.description || wcProd.short_description || '';
  const description = rawDesc ? rawDesc.replace(/<[^>]*>/g, '').trim() : template.description;

  return {
    id: String(wcProd.id),
    name: wcProd.name,
    category,
    categoryName,
    price,
    originalPrice,
    rating,
    ratingCount,
    benefits: template.benefits || ['PREMIUM', 'Quality Support'],
    image: imageUrl,
    inStock: wcProd.stock_status === 'instock' || wcProd.in_stock !== false,
    description,
    detailBadges: template.detailBadges || [],
    specs: template.specs || {},
    tabs: template.tabs || { specs: [], results: [], references: '' },
    precisionTitle: template.precisionTitle || 'Quality Standards',
    precisionText: template.precisionText || 'Strict adherence to global quality standards and pharmaceutical-grade safety verify steps.',
    howToUse: template.howToUse || [],
    reviews: template.reviews || []
  };
}

/**
 * Automates creation of default categories and uploads mock products to WooCommerce.
 */
export async function seedWooCommerce() {
  console.log('Checking WooCommerce database status...');
  try {
    const existingProducts = await wcFetch('/products?per_page=1');
    if (existingProducts.length > 0) {
      console.log('WooCommerce store is already populated. Seeding skipped.');
      return;
    }
  } catch (error) {
    console.error('Error querying existing products during seed check. Aborting seed.', error);
    return;
  }

  console.log('WooCommerce is empty. Initiating automatic database seeding...');
  
  // 1. Fetch or create categories
  const categoriesMap = {};
  const categoryTemplates = [
    { slug: 'infant-formula', name: 'Infant Milk Formulas' },
    { slug: 'supplements', name: 'Dietary Supplements' },
    { slug: 'cosmeceuticals', name: 'Cosmeceuticals' },
    { slug: 'surgical', name: 'Surgical Items' }
  ];

  try {
    const wcCats = await wcFetch('/products/categories?per_page=100');
    for (const temp of categoryTemplates) {
      const match = wcCats.find(c => c.slug === temp.slug);
      if (match) {
        categoriesMap[temp.slug] = match.id;
      } else {
        console.log(`Creating WooCommerce category: ${temp.name}`);
        const newCat = await wcFetch('/products/categories', {
          method: 'POST',
          body: JSON.stringify({ name: temp.name, slug: temp.slug })
        });
        categoriesMap[temp.slug] = newCat.id;
      }
    }
  } catch (e) {
    console.error('Failed to prepare product categories in WooCommerce:', e);
    return;
  }

  // 2. Upload mock products
  console.log('Uploading mock products to WooCommerce...');
  for (const mock of mockProducts) {
    try {
      const categoryId = categoriesMap[mock.category];
      const productPayload = {
        name: mock.name,
        type: 'simple',
        regular_price: String(mock.originalPrice || mock.price),
        sale_price: mock.originalPrice && mock.originalPrice > mock.price ? String(mock.price) : undefined,
        description: mock.description,
        short_description: mock.description.substring(0, 150) + '...',
        categories: categoryId ? [{ id: categoryId }] : [],
        stock_status: mock.inStock ? 'instock' : 'outofstock',
        manage_stock: false,
        // Since remote images are stored in public folder locally, we can point to them or let WooCommerce load them
        // Let's set the relative images or placeholders (WooCommerce won't download local paths, but we can save the list)
        // Pointing to a fallback or matching logic is handled dynamically during normalize.
      };

      const created = await wcFetch('/products', {
        method: 'POST',
        body: JSON.stringify(productPayload)
      });
      console.log(`Created product: ${created.name} (ID: ${created.id})`);
    } catch (err) {
      console.error(`Failed to create product "${mock.name}":`, err.message);
    }
  }

  console.log('WooCommerce seeding completed successfully!');
}

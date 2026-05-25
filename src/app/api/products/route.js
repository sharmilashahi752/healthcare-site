import { wcFetch, normalizeProduct, seedWooCommerce } from '../../../lib/woocommerce';
import { products as mockProducts } from '../../data/products';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    let wcProducts = [];
    try {
      wcProducts = await wcFetch('/products?per_page=100');
    } catch (fetchError) {
      console.error('Failed to connect to WooCommerce REST API. Using mock fallback.', fetchError);
      throw fetchError;
    }
    
    // Auto-seed if database is empty
    if (wcProducts.length === 0) {
      await seedWooCommerce();
      wcProducts = await wcFetch('/products?per_page=100');
    }

    const normalizedProducts = wcProducts.map(normalizeProduct);

    // Apply filtering on the server
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filtered = normalizedProducts;

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query)
      );
    }

    return Response.json(filtered);
  } catch (error) {
    console.warn('API /api/products serving mock fallback data due to connectivity issues.');
    
    // Dynamic query filters for the fallback data
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let filtered = mockProducts;

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query)
      );
    }

    return Response.json(filtered, {
      headers: { 'X-Fallback-Data': 'true' }
    });
  }
}

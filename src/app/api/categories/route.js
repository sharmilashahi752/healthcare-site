import { wcFetch } from '../../../lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const wcCats = await wcFetch('/products/categories?per_page=100');
    
    // Map WooCommerce categories, matching our slugs
    const validSlugs = ['infant-formula', 'supplements', 'cosmeceuticals', 'surgical'];
    const filteredCats = wcCats
      .filter(c => validSlugs.includes(c.slug))
      .map(c => ({
        id: c.slug,
        name: c.name
      }));

    const categoriesList = [
      { id: 'all', name: 'All Products' },
      ...filteredCats
    ];

    // Fallback to static lists if WooCommerce database doesn't have these categories yet
    if (categoriesList.length <= 1) {
      return Response.json([
        { id: 'all', name: 'All Products' },
        { id: 'infant-formula', name: 'Infant Formulas' },
        { id: 'supplements', name: 'Supplements' },
        { id: 'cosmeceuticals', name: 'Cosmeceuticals' },
        { id: 'surgical', name: 'Surgical Items' }
      ]);
    }

    return Response.json(categoriesList);
  } catch (error) {
    console.warn('API /api/categories using fallback layout due to API connectivity issues.');
    return Response.json([
      { id: 'all', name: 'All Products' },
      { id: 'infant-formula', name: 'Infant Formulas' },
      { id: 'supplements', name: 'Supplements' },
      { id: 'cosmeceuticals', name: 'Cosmeceuticals' },
      { id: 'surgical', name: 'Surgical Items' }
    ]);
  }
}

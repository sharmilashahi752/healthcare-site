import { wcFetch, normalizeProduct } from '../../../../lib/woocommerce';
import { products as mockProducts } from '../../../data/products';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const wcProduct = await wcFetch(`/products/${id}`);
    const normalized = normalizeProduct(wcProduct);
    return Response.json(normalized);
  } catch (error) {
    console.warn(`API /api/products/${id} falling back to mock search due to API connectivity.`);
    
    // Attempt to resolve from mock database
    const mockMatch = mockProducts.find(p => p.id === id);
    if (mockMatch) {
      return Response.json(mockMatch, {
        headers: { 'X-Fallback-Data': 'true' }
      });
    }

    return Response.json({ error: 'Product not found' }, { status: 404 });
  }
}

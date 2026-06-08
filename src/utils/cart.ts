import type {CartLine, Product, PromoCode} from '@/types/domain';

export const getCartTotals = (lines: CartLine[], products: Product[], promo?: PromoCode) => {
  const subtotal = lines.reduce((sum, line) => {
    const product = products.find(item => item.id === line.productId);
    return sum + (product?.price ?? 0) * line.quantity;
  }, 0);
  const deliveryFee = subtotal > 199 || subtotal === 0 ? 0 : 35;
  const gst = Math.round(subtotal * 0.05);
  const discount = promo ? Math.min(Math.round((subtotal * promo.discountPercent) / 100), promo.maxDiscount) : 0;
  return {subtotal, deliveryFee, gst, discount, total: Math.max(subtotal + deliveryFee + gst - discount, 0)};
};

export const FREE_SHIPPING_ABOVE = 5000;
export const FLAT_SHIPPING = 250;

export const shippingFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : FLAT_SHIPPING;

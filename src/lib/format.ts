const ars = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

export function formatPrice(value: number): string {
  return `$${ars.format(value)}`;
}

export function formatDecimal(value: number): string {
  return value.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

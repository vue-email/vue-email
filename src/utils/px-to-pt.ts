export function pxToPt(px: string | number): number | null {
  return Number.isNaN(Number(px)) ? null : (Number.parseInt(`${px}`, 10) * 3) / 4
}

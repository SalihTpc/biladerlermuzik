/** Resolve stored Firestore value (label or numeric id) to option id. */
export function resolveOptionId(
  raw: string | number | undefined | null,
  list: { id: number; label: string }[],
): number | undefined {
  if (raw === undefined || raw === null || raw === "") return undefined;
  const asNum = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isNaN(asNum) && String(asNum) === String(raw).trim()) {
    if (list.some((item) => item.id === asNum)) return asNum;
  }
  return list.find((item) => item.label === String(raw))?.id;
}

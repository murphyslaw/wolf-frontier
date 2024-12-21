export function ldapToUtc(value: number): string {
  const iso = new Date((value - 116444736000000000) / 10000).toISOString();

  return `${iso.substring(0, 10)} ${iso.substring(11, 19)}`;
}

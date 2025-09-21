export function apiUrl(pathname: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  if (!base) return pathname;
  const slash = pathname.startsWith('/') ? '' : '/';
  return `${base}${slash}${pathname}`;
}

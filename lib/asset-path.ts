// Public assets need the repository prefix on GitHub Pages.
export function assetPath(src: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!basePath || !src.startsWith('/') || src.startsWith('//') || src === basePath || src.startsWith(basePath + '/')) return src;
  return basePath + src;
}

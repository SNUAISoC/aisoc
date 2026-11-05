import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildRoot = path.join(root, '.pages-build');
// Only this generated directory is replaced; the working app and secrets stay untouched.
if (path.dirname(buildRoot) !== root || path.basename(buildRoot) !== '.pages-build') throw new Error('Invalid build directory');
await rm(buildRoot, { recursive: true, force: true });
await mkdir(buildRoot, { recursive: true });
for (const directory of ['components', 'lib', 'public', 'data']) {
  await cp(path.join(root, directory), path.join(buildRoot, directory), {
    recursive: true,
    filter: source => !source.endsWith('.tmp'),
  });
}
await cp(path.join(root, 'app'), path.join(buildRoot, 'app'), {
  recursive: true,
  filter: source => !['admin', 'api', '[slug]'].includes(path.relative(path.join(root, 'app'), source).split(path.sep)[0]),
});
for (const name of ['package.json', 'package-lock.json', 'tsconfig.json']) {
  await cp(path.join(root, name), path.join(buildRoot, name));
}
const basePath = process.env.PAGES_BASE_PATH ?? '/aisoc';
if (basePath && !/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath)) throw new Error('Invalid PAGES_BASE_PATH');
await writeFile(path.join(buildRoot, 'next.config.mjs'), `export default ${JSON.stringify({
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}, null, 2)};\n`);
const home = await readFile(path.join(root, 'app', 'page.tsx'), 'utf8');
if (!home.includes("export const dynamic='force-dynamic';")) throw new Error('Review homepage static export settings');
await writeFile(path.join(buildRoot, 'app', 'page.tsx'), home.replace("export const dynamic='force-dynamic';", "export const dynamic='force-static';"));
await mkdir(path.join(buildRoot, 'app', '[slug]'), { recursive: true });
await writeFile(path.join(buildRoot, 'app', '[slug]', 'page.tsx'), `import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getSite } from '@/lib/site';
import { InnerPage } from '@/components/PublicSite';
import StaticInnerPage from '@/components/StaticInnerPage';
const allowed = ['about', 'research', 'people', 'publications', 'news', 'contact'] as const;
export const dynamicParams = false;
export function generateStaticParams() {
  const site = getSite();
  return allowed.filter(slug => site.visibility[slug]).map(slug => ({ slug }));
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getSite();
  if (!allowed.some(value => value === slug) || !site.visibility[slug as typeof allowed[number]]) notFound();
  return <Suspense fallback={<InnerPage site={site} slug={slug} />}><StaticInnerPage site={site} slug={slug} /></Suspense>;
}
`);
await writeFile(path.join(buildRoot, 'components', 'StaticInnerPage.tsx'), `'use client';
import { useSearchParams } from 'next/navigation';
import { InnerPage } from './PublicSite';
import type { Site } from '@/lib/site';
export default function StaticInnerPage({site, slug}: {site: Site; slug: string}) {
  const query = useSearchParams();
  return <InnerPage site={site} slug={slug} group={query.get('group') || undefined} publicationType={query.get('type') || undefined} />;
}
`);
const result = spawnSync(process.execPath, [path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next'), 'build', buildRoot], {
  cwd: buildRoot,
  stdio: 'inherit',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
await writeFile(path.join(buildRoot, 'out', '.nojekyll'), '');
console.log('GitHub Pages files: ' + path.join(buildRoot, 'out'));

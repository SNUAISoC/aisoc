import Image, { type ImageProps } from 'next/image';
import { assetPath } from '@/lib/asset-path';

export default function SiteImage(props: ImageProps) {
  return <Image {...props} src={typeof props.src === 'string' ? assetPath(props.src) : props.src} />;
}

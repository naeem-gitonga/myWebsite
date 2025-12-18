'use client';

import Image, { type ImageProps } from 'next/image';

export default function LazyImage({ loading = 'lazy', ...props }: ImageProps) {
  return <Image loading={loading} {...props} />;
}

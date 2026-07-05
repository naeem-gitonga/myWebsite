// StaticImport is a Next.js ambient type (from next/image-types/global, via
// the frontend's next-env.d.ts) referenced by the shared @root/types/product.d.ts.
// This backend project never consumes that field, so a minimal stand-in is enough
// to let it type-check here.
declare global {
  type StaticImport = unknown;
}

export {};

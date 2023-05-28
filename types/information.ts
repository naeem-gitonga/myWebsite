export type Fields =
  | 'color'
  | 'material'
  | 'model'
  | 'pattern'
  | 'proofOfOrigin'
  | 'subcategory'
  | 'vintage'
  | 'size'
  | 'size_unit'
  | 'watch_mechanism'
  | 'material_watch_strap'
  | 'test_product';

export interface PsuedoEvent {
  key: string;
  preventDefault: () => void;
  stopPropagation: () => void;
  keyCode: number;
  target: { value: unknown };
}

export type TranslationsObject = {
  [x: string]: string;
};

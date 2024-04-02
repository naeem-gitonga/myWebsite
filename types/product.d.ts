export type Product = {
    id: number;
    title: string;
    imageUrl: string;
    productUrl: string;
    price: number;
    description: string;
    promotion: number;
    emailTemplate: string;
    isbn: string;
    publishedOn: string;
    show: boolean | string;
    emailTemplateHtml: string;
    s3Url: string;
    calendlyLink: boolean;
    previewLink: string;
    imageUrlItemView: string | StaticImport;
  };
  
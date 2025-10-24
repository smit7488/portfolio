// Media asset file details type
export interface ContentfulFileDetails {
  size?: number; // file size in bytes
  image?: {
    width: number;
    height: number;
  };
}

// Media asset type
export interface ContentfulAsset {
  fields: {
    file: {
      url: string;
      contentType: string;
      fileName?: string;
      details?: ContentfulFileDetails; // <-- replace 'any' with typed interface
    };
    title?: string;
    description?: string;
  };
}

// Genre entry type
export interface Genre {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    title: string;
  };
}

// PortfolioItem content type
export interface PortfolioItem {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    title: string;
    description: string;
    category: string;
    media?: ContentfulAsset;
    location?: string;
    embed?: string;
    genre?: Genre[];
    photos?: ContentfulAsset[];
  };
}

// Testimonial content type
export interface Testimonial {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    personName: string;
    quoteSnippet: string;
    longQuote: string;
    image?: ContentfulAsset;
  };
}

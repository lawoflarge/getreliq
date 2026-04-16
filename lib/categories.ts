export const CATEGORIES = [
  { slug: "furniture",    label: "Furniture",        query: "antique furniture" },
  { slug: "jewelry",      label: "Jewelry",          query: "antique jewelry" },
  { slug: "art",          label: "Art & Paintings",  query: "antique art paintings" },
  { slug: "clocks",       label: "Clocks & Watches", query: "antique clocks watches" },
  { slug: "ceramics",     label: "Ceramics",         query: "antique ceramics porcelain" },
  { slug: "glass",        label: "Glass",            query: "antique glass" },
  { slug: "silver",       label: "Silver",           query: "antique silver" },
  { slug: "textiles",     label: "Textiles & Rugs",  query: "antique textiles rugs" },
  { slug: "books",        label: "Books & Maps",     query: "antique books maps" },
  { slug: "sculpture",    label: "Sculpture",        query: "antique sculpture" },
  { slug: "lighting",     label: "Lighting",         query: "antique lighting lamps" },
  { slug: "collectibles", label: "Collectibles",     query: "antique collectibles" },
] as const;

export type CategorySlug = typeof CATEGORIES[number]["slug"];

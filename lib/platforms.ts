const e = encodeURIComponent;

export interface PlatformLink {
  id: string;
  name: string;
  tagline: string;
  commission: string;
  url: string;
}

export function getPlatformLinks(query: string): PlatformLink[] {
  const ebayId       = process.env.EBAY_CAMP_ID      ?? "";
  const awinId       = process.env.AWIN_AFF_ID       ?? "";
  const cataCamref   = process.env.CATAWIKI_CAMREF   ?? "";

  const ebayBase  = `https://www.ebay.com/sch/i.html?_nkw=${e(query)}&LH_ItemCondition=3000`;
  const etsyBase  = `https://www.etsy.com/search?q=${e(query)}`;
  const cataBase  = `https://www.catawiki.com/en/s?q=${e(query)}`;

  return [
    {
      id: "ebay",
      name: "eBay",
      tagline: "The world's largest marketplace for used and antique items",
      commission: "3% per sale",
      url: ebayId
        ? `${ebayBase}&campid=${ebayId}&toolid=10001&mkevt=1&mkcid=1`
        : ebayBase,
    },
    {
      id: "etsy",
      name: "Etsy",
      tagline: "Independent vintage specialists and antique dealers worldwide",
      commission: "4% per sale",
      url: awinId
        ? `https://www.awin1.com/cread.php?awinmid=6220&awinaffid=${awinId}&p=${e(etsyBase)}`
        : etsyBase,
    },
    {
      id: "catawiki",
      name: "Catawiki",
      tagline: "Expert-curated weekly auctions for serious collectors",
      commission: "€40 per new buyer",
      url: cataCamref
        ? `https://catawiki.prf.hn/click/camref:${cataCamref}/destination:${e(cataBase)}`
        : cataBase,
    },
    {
      id: "pamono",
      name: "Pamono",
      tagline: "Premium vintage design and antique furniture from top dealers",
      commission: "5–7% per sale",
      url: `https://www.pamono.com/search?q=${e(query)}`,
    },
    {
      id: "1stdibs",
      name: "1stDibs",
      tagline: "Luxury antiques from the world's most reputable dealers",
      commission: "3–5% per sale",
      url: `https://www.1stdibs.com/search/?q=${e(query)}`,
    },
    {
      id: "chairish",
      name: "Chairish",
      tagline: "Vintage and antique furniture, art and home décor",
      commission: "5% per sale",
      url: `https://www.chairish.com/search?q=${e(query)}`,
    },
    {
      id: "vinterior",
      name: "Vinterior",
      tagline: "Curated vintage from Europe's finest antique dealers",
      commission: "5% per sale",
      url: `https://www.vinterior.co/search?q=${e(query)}`,
    },
    {
      id: "rubylane",
      name: "Ruby Lane",
      tagline: "Trusted antiques and collectibles marketplace since 1998",
      commission: "ShareASale",
      url: `https://www.rubylane.com/search?search=${e(query)}&sv=1`,
    },
  ];
}

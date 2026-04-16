export interface AffiliateLink {
  platform: string;
  url: string;
  label: string;
  badge: string;
  description: string;
}

export function buildAffiliateLinks(searchTerms: string[]): AffiliateLink[] {
  const primary = searchTerms[0] ?? "";
  const secondary = searchTerms[1] ?? primary;
  const all = searchTerms.join(" ").trim();

  const ebayId = process.env.EBAY_CAMP_ID ?? "";
  const catawikiBase = process.env.CATAWIKI_TRACKING_PREFIX ?? "https://www.catawiki.com/de/s";
  const pamonoBase = process.env.PAMONO_TRACKING_PREFIX ?? "https://www.pamono.de/search";

  // eBay Partner Network: campid identifies your account, toolid=10001 = text link
  const ebayUrl = ebayId
    ? `https://www.ebay.de/sch/i.html?_nkw=${encodeURIComponent(primary)}&campid=${ebayId}&toolid=10001&mkevt=1&mkcid=1`
    : `https://www.ebay.de/sch/i.html?_nkw=${encodeURIComponent(primary)}`;

  // Catawiki: Partnerize-Tracking nach Anmeldung — aktuell direkter Deep-Link
  const catawikiUrl = `${catawikiBase}?q=${encodeURIComponent(secondary)}`;

  // Pamono: FlexOffers-Tracking nach Approval — aktuell direkter Deep-Link
  const pamonoUrl = `${pamonoBase}?q=${encodeURIComponent(all)}`;

  return [
    {
      platform: "eBay",
      url: ebayUrl,
      label: "Bei eBay suchen",
      badge: "3% Provision",
      description: "Größte Auswahl, sofort verfügbar",
    },
    {
      platform: "Catawiki",
      url: catawikiUrl,
      label: "Auf Catawiki bieten",
      badge: "€40 pro Neukunde",
      description: "Kuratierte Auktionen für Sammler",
    },
    {
      platform: "Pamono",
      url: pamonoUrl,
      label: "Auf Pamono entdecken",
      badge: "5–7% Provision",
      description: "Design & Vintage Möbel Premium",
    },
  ];
}

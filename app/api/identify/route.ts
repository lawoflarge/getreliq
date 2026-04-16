import { NextRequest, NextResponse } from "next/server";
import { identifyAntique } from "@/lib/claudeIdentify";
import { buildAffiliateLinks } from "@/lib/affiliateLinks";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Kein Bild hochgeladen" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Bild zu groß (max. 5 MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const result = await identifyAntique(base64, file.type);
    const affiliateLinks = buildAffiliateLinks(result.searchTerms);

    return NextResponse.json({ result, affiliateLinks });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

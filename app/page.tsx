"use client";

import { useCallback, useRef, useState } from "react";
import type { AntikResult } from "@/lib/claudeIdentify";
import type { AffiliateLink } from "@/lib/affiliateLinks";

interface ApiResponse {
  result: AntikResult;
  affiliateLinks: AffiliateLink[];
}

const CONFIDENCE_LABELS: Record<string, string> = {
  high: "Hohe Sicherheit",
  medium: "Mittlere Sicherheit",
  low: "Unsicher",
};

const CONFIDENCE_COLORS: Record<string, string> = {
  high: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-red-100 text-red-800",
};

const PLATFORM_COLORS: Record<string, string> = {
  eBay: "bg-yellow-400 hover:bg-yellow-500 text-yellow-900",
  Catawiki: "bg-orange-500 hover:bg-orange-600 text-white",
  Pamono: "bg-stone-800 hover:bg-stone-900 text-white",
};

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Bitte nur Bilder hochladen (JPEG, PNG, WebP)");
      return;
    }

    setError(null);
    setData(null);
    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const form = new FormData();
      form.append("image", file);

      const res = await fetch("/api/identify", { method: "POST", body: form });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Anfrage fehlgeschlagen");
      setData(json as ApiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const reset = () => {
    setPreview(null);
    setData(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-stone-900 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🏛️</span>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AntikFinder</h1>
            <p className="text-stone-400 text-xs">KI-Identifikation für Antiquitäten</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
        {/* Hero */}
        {!preview && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">
              Was ist dein Stück wert?
            </h2>
            <p className="text-stone-500 text-lg">
              Foto hochladen → KI erkennt Periode, Stil & Marktwert
            </p>
          </div>
        )}

        {/* Upload Zone */}
        {!preview && (
          <div
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`
              border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all
              ${dragOver
                ? "border-amber-500 bg-amber-50"
                : "border-stone-300 bg-white hover:border-amber-400 hover:bg-stone-50"
              }
            `}
          >
            <div className="text-6xl mb-4">📷</div>
            <p className="text-stone-700 font-semibold text-lg">
              Foto hierher ziehen oder klicken
            </p>
            <p className="text-stone-400 text-sm mt-2">JPEG, PNG oder WebP — max. 5 MB</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Preview + Loading */}
        {preview && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-200">
              <img
                src={preview}
                alt="Hochgeladenes Objekt"
                className="w-full h-72 object-contain bg-stone-100"
              />
              <div className="p-4 flex justify-between items-center">
                <span className="text-stone-500 text-sm">Dein Foto</span>
                <button
                  onClick={reset}
                  className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
                >
                  Neues Foto →
                </button>
              </div>
            </div>

            {/* Result or Loading */}
            <div>
              {loading && (
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-stone-600 font-medium">KI analysiert dein Stück...</p>
                  <p className="text-stone-400 text-sm">Periode • Stil • Marktwert</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <p className="text-red-700 font-medium mb-1">Fehler</p>
                  <p className="text-red-600 text-sm">{error}</p>
                  <button
                    onClick={reset}
                    className="mt-4 text-sm text-red-500 hover:text-red-700 underline"
                  >
                    Erneut versuchen
                  </button>
                </div>
              )}

              {data && <ResultCard {...data} />}
            </div>
          </div>
        )}

        {/* How it works */}
        {!preview && (
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: "📷", step: "1", label: "Foto hochladen" },
              { icon: "🤖", step: "2", label: "KI analysiert" },
              { icon: "🛒", step: "3", label: "Direkt kaufen" },
            ].map(({ icon, step, label }) => (
              <div key={step} className="bg-white rounded-xl p-5 border border-stone-200">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-stone-400 text-xs font-medium mb-1">SCHRITT {step}</div>
                <div className="font-semibold text-stone-700">{label}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-stone-400 text-xs border-t border-stone-200">
        AntikFinder PoC — powered by Claude AI
      </footer>
    </div>
  );
}

function ResultCard({ result, affiliateLinks }: ApiResponse) {
  const valueFormatted =
    result.valueRange.min > 0
      ? `${result.valueRange.min.toLocaleString("de-DE")} – ${result.valueRange.max.toLocaleString("de-DE")} €`
      : "Wert nicht schätzbar";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Object title */}
      <div className="bg-stone-900 text-white px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg leading-tight">{result.title}</h3>
          <span
            className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full ${
              CONFIDENCE_COLORS[result.confidence] ?? "bg-stone-100 text-stone-600"
            }`}
          >
            {CONFIDENCE_LABELS[result.confidence]}
          </span>
        </div>
        <p className="text-stone-400 text-sm mt-1">{result.category} · {result.period}</p>
      </div>

      {/* Details */}
      <div className="p-5 space-y-4">
        <p className="text-stone-600 text-sm leading-relaxed">{result.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Detail label="Stil" value={result.style} />
          <Detail label="Zustand" value={result.condition} />
          <Detail
            label="Schätzwert"
            value={valueFormatted}
            highlight
          />
          <Detail
            label="Suchbegriffe"
            value={result.searchTerms.slice(0, 2).join(", ")}
          />
        </div>

        {/* Affiliate CTAs */}
        <div className="pt-2 space-y-2">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
            Ähnliche Stücke finden
          </p>
          {affiliateLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                PLATFORM_COLORS[link.platform] ?? "bg-stone-100 hover:bg-stone-200 text-stone-800"
              }`}
            >
              <span>{link.label}</span>
              <span className="text-xs opacity-75">{link.badge} →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-amber-50 border border-amber-200" : "bg-stone-50"}`}>
      <div className="text-stone-400 text-xs font-medium uppercase tracking-wide mb-0.5">{label}</div>
      <div className={`font-semibold text-sm ${highlight ? "text-amber-900" : "text-stone-800"}`}>
        {value}
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { getPlatformLinks } from "@/lib/platforms";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "getreliq" };
  return {
    title: `Buy Antique ${cat.label} Online — getreliq`,
    description: `Find antique ${cat.label.toLowerCase()} across eBay, Etsy, Catawiki, Pamono, 1stDibs and more. Compare across 8 platforms instantly.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const platforms = getPlatformLinks(cat.query);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between">
            <Link
              href="/"
              className="font-serif text-2xl tracking-wide text-[#1A1714] hover:text-[#8B6914] transition-colors"
            >
              getreliq
            </Link>
            <span className="text-[#C4B89A] text-xs tracking-widest uppercase hidden sm:block">
              8 Platforms · Global
            </span>
          </div>
          <div className="mt-5 border-b border-[#DDD5C8]" />
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pb-16">
        <div className="mt-6 mb-8 flex items-center gap-2 text-xs text-[#A89880]">
          <Link href="/" className="hover:text-[#8B6914] transition-colors">Home</Link>
          <span className="text-[#DDD5C8]">·</span>
          <span className="text-[#6B5D52]">{cat.label}</span>
        </div>

        <div className="mb-10">
          <p className="text-xs tracking-[0.15em] uppercase text-[#8B6914] mb-2">Category</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1714] leading-tight mb-4">
            Antique {cat.label}
          </h1>
          <p className="text-[#6B5D52] text-lg max-w-lg leading-relaxed">
            Browse antique {cat.label.toLowerCase()} across the world&apos;s leading
            marketplaces and auction houses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-[#DDD5C8] p-5 hover:border-[#8B6914] transition-colors duration-150"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-serif text-xl text-[#1A1714] group-hover:text-[#8B6914] transition-colors">
                  {p.name}
                </span>
                <span className="text-xs text-[#8B6914] border border-[#DDD5C8] px-2 py-0.5 leading-tight ml-2 shrink-0">
                  {p.commission}
                </span>
              </div>
              <p className="text-[#6B5D52] text-sm leading-relaxed mb-4">{p.tagline}</p>
              <div className="text-xs font-medium text-[#8B6914] tracking-wide">
                Browse {cat.label} on {p.name} →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-[#DDD5C8]">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A89880] mb-6">Other categories</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="px-3 py-3 border border-[#DDD5C8] bg-white text-center text-xs font-medium text-[#6B5D52] hover:border-[#8B6914] hover:text-[#8B6914] transition-colors duration-150 tracking-wide"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#DDD5C8] py-6 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="text-[#C4B89A] text-xs">© {new Date().getFullYear()} getreliq</span>
          <span className="text-[#C4B89A] text-xs">8 platforms · Free to use</span>
        </div>
      </footer>
    </div>
  );
}

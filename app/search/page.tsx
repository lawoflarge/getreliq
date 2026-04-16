import Link from "next/link";
import { getPlatformLinks } from "@/lib/platforms";
import type { Metadata } from "next";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q = "" } = await searchParams;
  if (!q.trim()) return { title: "Search — getreliq" };
  return {
    title: `"${q}" Antiques — getreliq`,
    description: `Find "${q}" across eBay, Etsy, Catawiki, Pamono, 1stDibs and more antique platforms.`,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  if (!query) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B5D52] mb-4 text-sm">No search query provided.</p>
          <Link href="/" className="text-[#8B6914] text-sm hover:underline">
            ← Back to search
          </Link>
        </div>
      </div>
    );
  }

  const platforms = getPlatformLinks(query);

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
        <form action="/search" method="GET" className="flex max-w-xl mt-6 mb-10">
          <input
            name="q"
            type="search"
            defaultValue={query}
            autoComplete="off"
            className="flex-1 px-5 py-3 border border-[#DDD5C8] border-r-0 bg-white text-[#1A1714] placeholder-[#C4B89A] focus:outline-none focus:border-[#8B6914] text-sm"
          />
          <button
            type="submit"
            className="px-7 py-3 bg-[#1A1714] text-white text-sm tracking-widest uppercase hover:bg-[#8B6914] transition-colors duration-200"
          >
            Search
          </button>
        </form>

        <div className="mb-8">
          <p className="text-xs tracking-[0.15em] uppercase text-[#A89880] mb-1.5">
            Searching across {platforms.length} platforms for
          </p>
          <h1 className="font-serif text-3xl text-[#1A1714]">{query}</h1>
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
                Search on {p.name} →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/" className="text-xs text-[#A89880] hover:text-[#8B6914] tracking-wide transition-colors">
            ← New search
          </Link>
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

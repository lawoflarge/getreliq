import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "getreliq — Search Antiques Across 8 Platforms",
  description:
    "Search eBay, Etsy, Catawiki, Pamono, 1stDibs and more for antiques in one click. Free, instant, global.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-serif text-2xl tracking-wide text-[#1A1714]">getreliq</span>
              <p className="text-[#8B6914] text-xs tracking-[0.15em] uppercase mt-0.5">Antique Search</p>
            </div>
            <span className="text-[#C4B89A] text-xs tracking-widest uppercase hidden sm:block">
              8 Platforms · Global
            </span>
          </div>
          <div className="mt-5 border-b border-[#DDD5C8]" />
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pb-16">
        <div className="mt-14 mb-10 text-center">
          <h1 className="font-serif text-5xl sm:text-6xl text-[#1A1714] leading-tight">
            The World&apos;s Antiques,<br />One Search.
          </h1>
          <p className="mt-5 text-[#6B5D52] text-lg max-w-lg mx-auto leading-relaxed">
            eBay, Etsy, Catawiki, Pamono, 1stDibs and more —<br className="hidden sm:block" /> searched simultaneously.
          </p>
        </div>

        <form action="/search" method="GET" className="flex max-w-xl mx-auto">
          <input
            name="q"
            type="search"
            placeholder="e.g. Victorian dresser, Art Deco lamp, Meissen vase"
            autoComplete="off"
            className="flex-1 px-5 py-3.5 border border-[#DDD5C8] border-r-0 bg-white text-[#1A1714] placeholder-[#C4B89A] focus:outline-none focus:border-[#8B6914] text-sm"
          />
          <button
            type="submit"
            className="px-7 py-3.5 bg-[#1A1714] text-white text-sm tracking-widest uppercase hover:bg-[#8B6914] transition-colors duration-200 whitespace-nowrap"
          >
            Search
          </button>
        </form>

        <div className="mt-14">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A89880] mb-6 text-center">
            Browse by category
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-3 border border-[#DDD5C8] bg-white text-center text-xs font-medium text-[#6B5D52] hover:border-[#8B6914] hover:text-[#8B6914] transition-colors duration-150 tracking-wide"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-[#DDD5C8]">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A89880] mb-10 text-center">
            How it works
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {[
              { num: "I",   label: "Search",      desc: "Enter a keyword or choose a category" },
              { num: "II",  label: "We query",    desc: "8 platforms searched in one click" },
              { num: "III", label: "You discover", desc: "Click through directly to any listing" },
            ].map(({ num, label, desc }) => (
              <div key={num}>
                <div className="font-serif text-3xl text-[#C4B89A] mb-3">{num}</div>
                <div className="text-[#1A1714] text-sm font-semibold mb-1.5">{label}</div>
                <div className="text-[#A89880] text-xs leading-relaxed">{desc}</div>
              </div>
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

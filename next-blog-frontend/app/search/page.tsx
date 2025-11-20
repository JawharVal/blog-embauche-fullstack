import { searchPosts } from "@/lib/search";
import Link from "next/link";
export const revalidate = 60;

export const dynamic = "force-dynamic";

export default async function SearchPage(props: any) {
    // ⬅ New Next.js 16 rule
    const searchParams = await props.searchParams;

    const q = searchParams?.q || "";
    const page = Number(searchParams?.page || "1");

    const res = await searchPosts(q, page);
    const posts = res.data;
    const pagination = res.meta.pagination;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Search</h1>

            {/* Search bar */}
            <form action="/search" method="get" className="flex gap-2">
                <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Search..."
                    className="border p-2 rounded flex-1"
                />
                <button className="bg-blue-600 text-white px-4 rounded">Go</button>
            </form>

            {!q && (
                <p className="text-gray-400">Type something above to search posts.</p>
            )}

            {q && posts.length === 0 && (
                <p className="text-gray-400">
                    No results found for <strong>{q}</strong>.
                </p>
            )}

            <ul className="space-y-3">
                {posts.map((p) => (
                    <li key={p.id} className="border rounded-lg p-4">
                        <Link href={`/post/${p.slug}`}>
                            <h2 className="text-xl font-semibold">{p.title}</h2>
                        </Link>
                        {p.excerpt && (
                            <p className="text-gray-400 text-sm mt-1">{p.excerpt}</p>
                        )}
                    </li>
                ))}
            </ul>

            {q && posts.length > 0 && (
                <Pagination base={`/search?q=${q}`} pagination={pagination} />
            )}
        </div>
    );
}

function Pagination({
                        base,
                        pagination,
                    }: {
    base: string;
    pagination: { page: number; pageCount: number };
}) {
    const { page, pageCount } = pagination;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">

            {page > 1 && (
                <Link href={`${base}&page=${page - 1}`} className="underline">
                    ← Previous
                </Link>
            )}

            <span>
                Page {page} / {pageCount}
            </span>

            {page < pageCount && (
                <Link href={`${base}&page=${page + 1}`} className="underline">
                    Next →
                </Link>
            )}
        </div>
    );
}

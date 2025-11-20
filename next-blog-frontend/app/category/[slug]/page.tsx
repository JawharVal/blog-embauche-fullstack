import { getCategoryPosts } from "@/lib/categories";
import Link from "next/link";
export const revalidate = 60;

export const dynamic = "force-static";
export const dynamicParams = true;
export async function generateMetadata(
    { params }: { params: { slug: string } }
) {

    const name = params.slug;
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/category/${params.slug}`;

    return {
        title: `Category: ${name}`,
        description: `Posts in category ${name}`,
        alternates: { canonical: url },
        openGraph: {
            title: `Category: ${name}`,
            description: `Posts in category ${name}`,
            url,
        },
    };
}

export default async function CategoryPage(props: any) {
    const { slug } = await props.params;  // ← IMPORTANT FIX
    const page = Number(props.searchParams?.page || "1");

    const res = await getCategoryPosts(slug, page);
    const posts = res.data;
    const pagination = res.meta.pagination;

    if (!posts || posts.length === 0) {
        return (
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">
                    Category: {slug}
                </h1>
                <p>No posts in this category.</p>
            </div>
        );
    }

    const categoryName = posts[0]?.category?.name || slug;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold">Category: {categoryName}</h1>

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

            <Pagination base={`/category/${slug}`} pagination={pagination} />
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
        <div className="flex items-center gap-4 mt-6">
            {page > 1 && (
                <Link href={`${base}?page=${page - 1}`} className="underline">
                    ← Previous
                </Link>
            )}

            <span>
        Page {page} / {pageCount}
      </span>

            {page < pageCount && (
                <Link href={`${base}?page=${page + 1}`} className="underline">
                    Next →
                </Link>
            )}
        </div>
    );
}

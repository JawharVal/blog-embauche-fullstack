import { getPosts } from "@/lib/posts";
import { getCategories } from "@/lib/categories";
import { getTags } from "@/lib/tags";
import { getAuthors } from "@/lib/authors";

export async function GET() {
    const base = process.env.NEXT_PUBLIC_SITE_URL;

    const posts = await getPosts();
    const categories = await getCategories();
    const tags = await getTags();
    const authors = await getAuthors();

    const urls = [
        {
            loc: `${base}`,
            lastmod: new Date().toISOString(),
            changefreq: "daily",
            priority: 1.0,
        },

        // POSTS
        ...posts.data.map((p) => ({
            loc: `${base}/post/${p.slug}`,
            lastmod: p.updatedAt || p.publishedAt || new Date().toISOString(),
            changefreq: "weekly",
            priority: 0.9,
        })),

        // CATEGORIES (safe slug)
        ...categories.data.map((c) => ({
            loc: `${base}/category/${c?.slug ?? c?.id ?? ""}`,
            lastmod: new Date().toISOString(),
            changefreq: "weekly",
            priority: 0.8,
        })),

        // TAGS (safe slug)
        ...tags.data.map((t) => ({
            loc: `${base}/tag/${t?.slug ?? t?.id ?? ""}`,
            lastmod: new Date().toISOString(),
            changefreq: "weekly",
            priority: 0.6,
        })),

        // AUTHORS (safe slug)
        ...authors.data.map((a) => ({
            loc: `${base}/author/${a?.slug ?? a?.id ?? ""}`,
            lastmod: new Date().toISOString(),
            changefreq: "weekly",
            priority: 0.7,
        })),
    ];

    const xml = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
        .map(
            (u) => `
                <url>
                    <loc>${u.loc}</loc>
                    <lastmod>${u.lastmod}</lastmod>
                    <changefreq>${u.changefreq}</changefreq>
                    <priority>${u.priority}</priority>
                </url>
            `
        )
        .join("")}
        </urlset>
    `;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}

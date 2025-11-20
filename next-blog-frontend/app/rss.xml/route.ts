import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
    const base = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await getPosts();

    const items = res.data
        .map((post) => {
            const url = `${base}/post/${post.slug}`;

            // SAFELY HANDLE DATE
            const rawDate =
                post.publishedAt ??
                post.createdAt ??
                new Date().toISOString();

            const pubDate = new Date(rawDate).toUTCString();

            const description = post.excerpt || "";

            const content = `
                <![CDATA[
                    <h1>${post.title}</h1>
                    <p>${description}</p>
                ]]>
            `;

            return `
                <item>
                    <title>${post.title}</title>
                    <link>${url}</link>
                    <guid>${url}</guid>
                    <pubDate>${pubDate}</pubDate>
                    <description><![CDATA[${description}]]></description>
                    <content:encoded>${content}</content:encoded>
                </item>
            `;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>My Blog RSS Feed</title>
        <link>${base}</link>
        <description>Latest posts from My Blog</description>
        <language>en</language>
        <ttl>60</ttl>
        ${items}
    </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}

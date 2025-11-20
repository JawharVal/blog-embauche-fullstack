import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/posts";
import NewsletterForm from "@/components/NewsletterForm";

export const revalidate = 60;

export default async function Home() {
    const posts = await getPosts();

    return (
        <div className="space-y-8 p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>

            {posts.data.map((post: any) => {
                // Strapi v5: fields are at root, not inside attributes
                const p = post;

                // Strapi v5: media is directly in p.cover
                const cover = p.cover;

                const imgUrl = cover?.url
                    ? process.env.NEXT_PUBLIC_STRAPI_URL + cover.url
                    : null;

                return (
                    <article key={post.id} className="border rounded-xl p-4 shadow-sm">
                        {imgUrl && (
                            <Image
                                src={imgUrl}
                                alt={p.title}
                                width={800}
                                height={400}
                                className="rounded-lg"
                            />
                        )}

                        <h2 className="text-2xl font-semibold mt-4">
                            <Link href={`/post/${p.slug}`}>{p.title}</Link>
                        </h2>

                        <p className="text-gray-600 mt-2">{p.excerpt}</p>
                    </article>
                );
            })}

            <div className="border rounded-xl p-4 shadow-sm">
                <NewsletterForm/>
            </div>

        </div>
    );
}

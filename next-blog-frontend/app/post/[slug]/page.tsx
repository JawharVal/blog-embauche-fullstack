import { getPost, getPosts } from "@/lib/posts";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
export const revalidate = 60;

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
    const res = await getPosts();

    return res.data.map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;

    const res = await getPost(slug);
    if (!res.data || res.data.length === 0) return notFound();

    const p = res.data[0];

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{p.title}</h1>
            <p className="text-gray-400 mb-6">{p.excerpt}</p>

            {/* Render Rich Text */}
            <BlocksRenderer content={p.content} />

        </div>
    );
}

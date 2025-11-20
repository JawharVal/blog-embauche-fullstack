import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);

    console.log("Webhook body:", body);
    console.log("Loaded secret:", process.env.REVALIDATE_SECRET);
    console.log("Incoming secret:", secret);
    try {
        await Promise.all([
            // Homepage
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate-path`, {
                method: "POST",
                body: JSON.stringify({ path: "/" }),
            }),

            // Single post (if available)
            body?.model === "post" && body?.entry?.slug
                ? fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate-path`, {
                    method: "POST",
                    body: JSON.stringify({ path: `/post/${body.entry.slug}` }),
                })
                : Promise.resolve(),

            // Categories
            body?.entry?.category?.slug
                ? fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate-path`, {
                    method: "POST",
                    body: JSON.stringify({
                        path: `/category/${body.entry.category.slug}`,
                    }),
                })
                : Promise.resolve(),
        ]);

        return NextResponse.json({ revalidated: true });
    } catch (err) {
        console.error("Revalidate error:", err);
        return NextResponse.json({ message: "Error during revalidate" }, { status: 500 });
    }
}

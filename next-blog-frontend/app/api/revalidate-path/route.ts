import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    const { path } = await req.json();

    console.log("Revalidating path:", path);

    try {
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, path });
    } catch (e) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

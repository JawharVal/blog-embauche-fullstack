export async function fetchStrapi(path: string, searchParams: Record<string, string> = {}) {
    const base = process.env.NEXT_PUBLIC_STRAPI_URL!;
    const url = new URL(base + "/api" + path);

    Object.entries(searchParams).forEach(([k, v]) => {
        url.searchParams.set(k, v);
    });

    const res = await fetch(url.toString());

    if (!res.ok) {
        const text = await res.text();
        console.log("STRAPI ERROR RESPONSE:", text);
        throw new Error(`Strapi error: ${res.status}`);
    }

    return res.json();
}

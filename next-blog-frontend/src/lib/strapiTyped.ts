import { ZodSchema } from "zod";

export async function fetchStrapiTyped<T>(
    path: string,
    schema: ZodSchema<T>,
    searchParams: Record<string, string> = {}
): Promise<T> {

    const baseUrl = process.env.STRAPI_URL;

    if (!baseUrl) {
        throw new Error("STRAPI_URL is missing in .env.local");
    }

    const url = new URL(baseUrl + "/api" + path);

    Object.entries(searchParams).forEach(([k, v]) => {
        url.searchParams.set(k, v);
    });

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const json = await res.json();
    console.log("STRAPI JSON:", json);
    return schema.parse(json);

}

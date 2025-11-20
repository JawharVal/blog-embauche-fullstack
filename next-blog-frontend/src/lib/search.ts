import { fetchStrapiTyped } from "@/lib/strapiTyped";
import { postListResponseSchema } from "@/lib/schemas";

export async function searchPosts(query: string, page = 1) {
    if (!query || query.trim() === "") {
        return {
            data: [],
            meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } },
        };
    }

    return fetchStrapiTyped("/posts", postListResponseSchema, {
        populate: "*",
        "filters[$or][0][title][$containsi]": query,
        "filters[$or][1][excerpt][$containsi]": query,
        // search inside blocks JSON as text:
        "filters[$or][2][content][$containsi]": query,
        "pagination[page]": String(page),
        "pagination[pageSize]": "10",
        sort: "publishedAt:desc",
    });
}

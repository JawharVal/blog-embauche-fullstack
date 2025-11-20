import { fetchStrapiTyped } from "@/lib/strapiTyped";
import {
    authorListResponseSchema,
    postListResponseSchema,
} from "@/lib/schemas";

export async function getAuthors() {
    return fetchStrapiTyped("/authors", authorListResponseSchema, {
        sort: "name:asc",
    });
}

export async function getAuthorPosts(slug: string, page = 1) {
    return fetchStrapiTyped("/posts", postListResponseSchema, {
        populate: "*",
        "filters[author][slug][$eq]": slug,
        "pagination[page]": String(page),
        "pagination[pageSize]": "10",
        sort: "publishedAt:desc",
    });
}

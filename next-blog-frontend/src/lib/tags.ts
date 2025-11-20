import { fetchStrapiTyped } from "@/lib/strapiTyped";
import {
    tagListResponseSchema,
    postListResponseSchema,
} from "@/lib/schemas";

export async function getTags() {
    return fetchStrapiTyped("/tags", tagListResponseSchema, {
        sort: "name:asc",
    });
}

export async function getTagPosts(slug: string, page = 1) {
    return fetchStrapiTyped("/posts", postListResponseSchema, {
        populate: "*",
        "filters[tags][slug][$eq]": slug,
        "pagination[page]": String(page),
        "pagination[pageSize]": "10",
        sort: "publishedAt:desc",
    });
}

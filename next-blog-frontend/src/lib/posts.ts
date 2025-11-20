import { fetchStrapiTyped } from "@/lib/strapiTyped";
import {
    postListResponseSchema,
    singlePostResponseSchema,
} from "@/lib/schemas";

export async function getPosts(page = 1, pageSize = 5) {
    return fetchStrapiTyped(`/posts`, postListResponseSchema, {
        populate: "*",
        sort: "publishedAt:desc",
        "pagination[page]": String(page),
        "pagination[pageSize]": String(pageSize),
    });
}

export async function getPost(slug: string) {
    return fetchStrapiTyped(`/posts`, singlePostResponseSchema, {
        populate: "*",
        "filters[slug][$eq]": slug,
    });
}

import { fetchStrapiTyped } from "@/lib/strapiTyped";
import {
    categoryListResponseSchema,
    postListResponseSchema,
} from "@/lib/schemas";

export async function getCategories() {
    return fetchStrapiTyped("/categories", categoryListResponseSchema, {
        sort: "name:asc",
    });
}

export async function getCategoryPosts(slug: string, page = 1) {
    return fetchStrapiTyped(
        `/posts`,
        postListResponseSchema,
        {
            "filters[category][slug][$eq]": slug,
            "pagination[page]": page.toString(),
            "pagination[pageSize]": "10",
            "populate": "*",
        }
    );
}

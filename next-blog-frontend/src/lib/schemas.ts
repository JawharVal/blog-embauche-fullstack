import { z } from "zod";

//
// MEDIA
//
export const mediaSchema = z
    .object({
        id: z.number().optional(),
        documentId: z.string().nullable().optional(),
        url: z.string().nullable().optional(),
        alternativeText: z.string().nullable().optional(),
        createdAt: z.string().nullable().optional(),
        updatedAt: z.string().nullable().optional(),
        publishedAt: z.string().nullable().optional(),
    })
    .nullable()
    .optional();

//
// AUTHOR
//
export const authorSchema = z
    .object({
        id: z.number().nullable().optional(),
        documentId: z.string().nullable().optional(),
        name: z.string().nullable().optional(),
        slug: z.string().nullable().optional(),
        bio: z.string().nullable().optional(),
        createdAt: z.string().nullable().optional(),
        updatedAt: z.string().nullable().optional(),
        publishedAt: z.string().nullable().optional(),
    })
    .nullable()
    .optional();

//
// CATEGORY
//
export const categorySchema = z
    .object({
        id: z.number().nullable().optional(),
        documentId: z.string().nullable().optional(),
        name: z.string().nullable().optional(),
        slug: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        createdAt: z.string().nullable().optional(),
        updatedAt: z.string().nullable().optional(),
        publishedAt: z.string().nullable().optional(),
    })
    .nullable()
    .optional();

//
// TAG
//
export const tagSchema = z
    .object({
        id: z.number().nullable().optional(),
        documentId: z.string().nullable().optional(),
        name: z.string().nullable().optional(),
        slug: z.string().nullable().optional(),
        createdAt: z.string().nullable().optional(),
        updatedAt: z.string().nullable().optional(),
        publishedAt: z.string().nullable().optional(),
    })
    .nullable()
    .optional();

//
// POST
//
export const postSchema = z.object({
    id: z.number(),
    documentId: z.string(),
    slug: z.string(),
    title: z.string(),
    excerpt: z.string().nullable().optional(),
    content: z.any(),
    readingTime: z.number().nullable().optional(),

    publishedAts: z.string().nullable().optional(),

    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    publishedAt: z.string().nullable().optional(),

    author: authorSchema.nullable().optional(),
    category: categorySchema.nullable().optional(),
    tags: z.array(tagSchema).nullable().optional(),

    cover: mediaSchema.nullable().optional(),
});

//
// PAGINATION
//
export const paginationSchema = z.object({
    page: z.number(),
    pageSize: z.number(),
    pageCount: z.number(),
    total: z.number(),
});

//
// RESPONSES
//
export const postListResponseSchema = z.object({
    data: z.array(postSchema),
    meta: z.object({ pagination: paginationSchema }),
});

export const singlePostResponseSchema = z.object({
    data: z.array(postSchema),
});

export const categoryListResponseSchema = z.object({
    data: z.array(categorySchema),
    meta: z.object({ pagination: paginationSchema }),
});

export const tagListResponseSchema = z.object({
    data: z.array(tagSchema),
    meta: z.object({ pagination: paginationSchema }),
});

export const authorListResponseSchema = z.object({
    data: z.array(authorSchema),
    meta: z.object({ pagination: paginationSchema }),
});

export type Post = z.infer<typeof postSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Tag = z.infer<typeof tagSchema>;
export type Author = z.infer<typeof authorSchema>;

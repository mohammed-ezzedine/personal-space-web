export interface ArticleSummary {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    thumbnailImageUrl?: string;
    keywords: string[]
}
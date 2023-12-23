export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    categoryId: string;
    thumbnailImageUrl?: string;
}
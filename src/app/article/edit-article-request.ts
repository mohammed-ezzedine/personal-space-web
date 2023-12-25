export interface EditArticleRequest {
    title?: string;
    description?: string;
    content?: string;
    categoryId?: string;
    hidden?: boolean;
    thumbnailImageUrl?: string;
    keywords?: string[];
}
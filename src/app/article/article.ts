export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    categoryId: string;
    thumbnailImageUrl?: string;
    keywords: string[];
    createdDate: string;
    lastModifiedDate: string;
    hidden: boolean;
}
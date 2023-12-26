export interface ArticleSummary {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    thumbnailImageUrl?: string;
    keywords: string[];
    createdDate: string;
    lastModifiedDate: string;
    hidden: boolean;
}

export interface HighlightedArticleSummary extends ArticleSummary {
    highlighted: boolean;
}

export interface Article extends ArticleSummary {
    content: string;
}
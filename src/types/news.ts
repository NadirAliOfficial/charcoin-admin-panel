export enum NewsStatus {
  Published = "Published",
  Unpublished = "Unpublished",
}

export interface NewsArticle {
  id: number;
  video_thumbnail: string;
  title: string;
  short_description: string;
  status: NewsStatus;
  category: string;
  posted_on: string;
  views: number;
}

export interface NewsSummary {
  total_articles: number;
}

export interface NewsData {
  news_summary: NewsSummary;
  news_data: NewsArticle[];
}

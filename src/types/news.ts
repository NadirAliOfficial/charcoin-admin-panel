export enum NewsStatus {
  All = "all",
  Published = "published",
  Unpublished = "unpublished"
}

export type NewsStatusOption = {
  label: string;
  value: NewsStatus;
};

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

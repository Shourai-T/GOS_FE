export interface ScoreData {
  sbd: string;
  ma_ngoai_ngu?: string;
  group_a_score?: string;
  scores: Record<string, number>;
}

export interface StudentData {
  rank: number;
  sbd: string;
  group_a_score: string;
  scores: Record<string, number>;
}

export interface DistributionItem {
  subject_name: string;
  excellent: number;
  good: number;
  average: number;
  weak: number;
}

export interface DistributionData {
  [key: string]: DistributionItem;
}

export interface ChartDataPoint {
  name: string;
  Giỏi: number;
  Khá: number;
  TB: number;
  Yếu: number;
}

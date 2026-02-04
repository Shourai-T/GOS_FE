import apiClient from '../api/client';
import type { ScoreData, DistributionData, StudentData } from '../types';

export const studentService = {
  // ✅ Added AbortSignal support for search
  searchBySbd: async (sbd: string, signal?: AbortSignal): Promise<ScoreData> => {
    const response = await apiClient.post('/search', { sbd }, { signal });
    return response.data; // Already unwrapped by interceptor
  },

  getDistribution: async (signal?: AbortSignal): Promise<DistributionData> => {
    const response = await apiClient.get('/reports/distribution', { signal });
    return response.data; // Already unwrapped by interceptor
  },

  getTopGroupA: async (signal?: AbortSignal): Promise<StudentData[]> => {
    const response = await apiClient.get('/reports/top-group-a', { signal });
    return response.data; // Already unwrapped by interceptor
  },
};

import api from '../api';

export interface ReviewFilters {
  page?: number;
  limit?: number;
  companyId?: string;
  userId?: string;
  minRating?: number;
}

export interface ReviewPayload {
  companyId: string;
  rating: number;
  title?: string;
  content?: string;
}

export async function getReviews(filters: ReviewFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  const { data } = await api.get(`/reviews?${params.toString()}`);
  return data;
}

export async function createReview(payload: ReviewPayload, token: string) {
  const { data } = await api.post('/reviews', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

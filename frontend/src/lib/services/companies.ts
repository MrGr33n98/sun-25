import api from '../api';

export interface CompanyFilters {
  page?: number;
  limit?: number;
  city?: string;
  state?: string;
  services?: string;
  minRating?: number;
  q?: string;
}

export async function getCompanies(filters: CompanyFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  const { data } = await api.get(`/companies?${params.toString()}`);
  return data;
}

export async function getCompany(id: string) {
  const { data } = await api.get(`/companies/${id}`);
  return data;
}

export async function searchCompanies(query: string, filters: CompanyFilters = {}) {
  return getCompanies({ ...filters, q: query });
}

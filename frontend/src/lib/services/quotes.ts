import api from '../api';

export interface QuotePayload {
  companyId: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  projectType?: string;
  estimatedPower?: string;
  location?: string;
}

export async function createQuote(payload: QuotePayload) {
  const { data } = await api.post('/quotes', payload);
  return data;
}

export async function getQuotes(token: string) {
  const { data } = await api.get('/quotes', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
}

import api from '../api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export async function login(payload: LoginPayload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function getProfile(token: string) {
  const { data } = await api.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
}

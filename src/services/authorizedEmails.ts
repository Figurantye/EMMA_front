import api from './api';

export const fetchAuthorizedEmails = () =>
  api.get('/api/authorized-emails').then(res => res.data);

export const addAuthorizedEmail = (email: string) =>
  api.post('/api/authorized-emails', { email });

export const deleteAuthorizedEmail = (id: number) =>
  api.delete(`/api/authorized-emails/${id}`);

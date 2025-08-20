import api from './api';

export const fetchAuthorizedEmails = () =>
  api.get('/authorized-emails').then(res => res.data);

export const addAuthorizedEmail = (email: string) =>
  api.post('/authorized-emails', { email });

export const deleteAuthorizedEmail = (id: number) =>
  api.delete(`/authorized-emails/${id}`);

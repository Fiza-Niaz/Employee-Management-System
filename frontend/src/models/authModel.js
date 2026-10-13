import { apiRequest } from '../config/apiConfig';

const TOKEN_KEY = 'employee-management-token';
const USER_KEY = 'employee-management-user';

export function readSession() {
  const token = localStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem(USER_KEY);
  if (!token || !rawUser) {
    return null;
  }

  try {
    return { token, user: JSON.parse(rawUser) };
  } catch {
    clearSession();
    return null;
  }
}

export function saveSession(session) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function login(credentials) {
  const session = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  saveSession(session);
  return session;
}

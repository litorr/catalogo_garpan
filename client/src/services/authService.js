import API_URL from '../config';

export const loginAdmin = async (username, password) => {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return await res.json();
};

export const validateWholesaleCode = async (code) => {
  const res = await fetch(`${API_URL}/api/validate-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: code })
  });
  return await res.json();
};
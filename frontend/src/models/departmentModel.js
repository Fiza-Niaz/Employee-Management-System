import { apiRequest } from '../config/apiConfig';

export const getDepartments = () => apiRequest('/departments');

export const createDepartment = (department) => apiRequest('/departments', {
  method: 'POST',
  body: JSON.stringify(department)
});

export const updateDepartment = (id, department) => apiRequest(`/departments/${encodeURIComponent(id)}`, {
  method: 'PATCH',
  body: JSON.stringify(department)
});

export const deleteDepartment = (id) => apiRequest(`/departments/${encodeURIComponent(id)}`, {
  method: 'DELETE'
});

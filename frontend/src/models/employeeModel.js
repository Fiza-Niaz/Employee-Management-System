import { apiRequest } from '../config/apiConfig';

export const getEmployees = () => apiRequest('/employees');

export const createEmployee = (employee) => apiRequest('/employees', {
  method: 'POST',
  body: JSON.stringify(employee)
});

export const updateEmployee = (id, employee) => apiRequest(`/employees/${encodeURIComponent(id)}`, {
  method: 'PATCH',
  body: JSON.stringify(employee)
});

export const deleteEmployee = (id) => apiRequest(`/employees/${encodeURIComponent(id)}`, {
  method: 'DELETE'
});

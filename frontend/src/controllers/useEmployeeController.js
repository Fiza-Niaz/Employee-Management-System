import { useCallback, useEffect, useState } from 'react';
import * as employeeModel from '../models/employeeModel';

export default function useEmployeeController() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setEmployees(await employeeModel.getEmployees());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = async (employee) => {
    setError('');
    try {
      if (employee._id) {
        await employeeModel.updateEmployee(employee._id, employee);
      } else {
        await employeeModel.createEmployee(employee);
      }
      await refresh();
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    }
  };

  const remove = async (id) => {
    setError('');
    try {
      await employeeModel.deleteEmployee(id);
      await refresh();
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    }
  };

  return { employees, loading, error, refresh, save, remove };
}

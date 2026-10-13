import { useCallback, useEffect, useState } from 'react';
import * as departmentModel from '../models/departmentModel';

export default function useDepartmentController() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setDepartments(await departmentModel.getDepartments());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = async (department) => {
    setError('');
    try {
      if (department._id) {
        await departmentModel.updateDepartment(department._id, department);
      } else {
        await departmentModel.createDepartment(department);
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
      await departmentModel.deleteDepartment(id);
      await refresh();
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    }
  };

  return { departments, loading, error, refresh, save, remove };
}

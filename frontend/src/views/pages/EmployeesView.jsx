import { useMemo, useState } from 'react';
import useEmployeeController from '../../controllers/useEmployeeController';
import useDepartmentController from '../../controllers/useDepartmentController';

const blankEmployee = { name: '', email: '', phone: '', address: '', salary: '', department: '', image: '' };
const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value) || 0);

function EmployeeDialog({ employee, departments, onClose, onSave }) {
  const [form, setForm] = useState(employee || blankEmployee);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave({ ...form, salary: Number(form.salary) });
      onClose();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="employee-dialog-title">
        <div className="modal-heading"><div><div className="eyebrow">{employee ? 'EDIT DETAILS' : 'NEW TEAM MEMBER'}</div><h2 id="employee-dialog-title">{employee ? 'Edit employee' : 'Add employee'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close dialog">×</button></div>
        {error && <div className="alert alert-error" role="alert">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-grid">
            <label className="field"><span>Full name</span><input name="name" value={form.name} onChange={change} required /></label>
            <label className="field"><span>Email</span><input type="email" name="email" value={form.email} onChange={change} required /></label>
            <label className="field"><span>Phone</span><input name="phone" value={form.phone} onChange={change} required /></label>
            <label className="field"><span>Salary (annual)</span><input type="number" name="salary" min="0" step="0.01" value={form.salary} onChange={change} required /></label>
            <label className="field"><span>Department</span>{departments.length ? <select name="department" value={form.department} onChange={change} required><option value="">Select a department</option>{departments.map((department) => <option key={department._id} value={department.name}>{department.name}</option>)}</select> : <input name="department" value={form.department} onChange={change} placeholder="e.g. Engineering" required />}</label>
            <label className="field"><span>Profile image URL</span><input type="url" name="image" value={form.image} onChange={change} placeholder="https://…" required /></label>
            <label className="field field-full"><span>Address</span><input name="address" value={form.address} onChange={change} required /></label>
          </div>
          <div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary" disabled={saving}>{saving ? 'Saving…' : employee ? 'Save changes' : 'Add employee'}</button></div>
        </form>
      </section>
    </div>
  );
}

export default function EmployeesView() {
  const { employees, loading, error, save, remove } = useEmployeeController();
  const { departments } = useDepartmentController();
  const [query, setQuery] = useState('');
  const [dialogEmployee, setDialogEmployee] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionError, setActionError] = useState('');
  const filtered = useMemo(() => employees.filter((employee) => `${employee.name} ${employee.email} ${employee.department}`.toLowerCase().includes(query.toLowerCase())), [employees, query]);

  const deleteEmployee = async (employee) => {
    if (!window.confirm(`Delete ${employee.name}? This action cannot be undone.`)) return;
    setActionError('');
    try {
      await remove(employee._id);
    } catch (requestError) {
      setActionError(requestError.message);
    }
  };

  return (
    <>
      <header className="page-heading">
        <div><div className="eyebrow">YOUR PEOPLE</div><h1>Employees</h1><p>Manage your employee directory and details.</p></div>
        <button className="button button-primary" onClick={() => { setDialogEmployee(null); setDialogOpen(true); }}>＋ Add employee</button>
      </header>
      {(error || actionError) && <div className="alert alert-error" role="alert">{actionError || error}</div>}
      <section className="panel">
        <div className="panel-heading panel-heading-wrap">
          <div><h2>All employees <span className="count-pill">{employees.length}</span></h2><p>Search and manage your team members</p></div>
          <label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search employees" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search employees..." /></label>
        </div>
        {loading ? <div className="empty-state">Loading employees…</div> : filtered.length ? (
          <div className="table-wrap"><table>
            <thead><tr><th>EMPLOYEE</th><th>EMAIL</th><th>PHONE</th><th>DEPARTMENT</th><th>SALARY</th><th className="align-right">ACTIONS</th></tr></thead>
            <tbody>{filtered.map((employee) => (
              <tr key={employee._id}>
                <td><div className="employee-cell"><img className="avatar" src={employee.image} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} /><span className="employee-name">{employee.name}</span></div></td>
                <td className="muted-cell">{employee.email}</td><td className="muted-cell">{employee.phone}</td>
                <td><span className="tag">{employee.department}</span></td><td>{money(employee.salary)}</td>
                <td><div className="table-actions"><button className="button button-small button-outline" onClick={() => { setDialogEmployee(employee); setDialogOpen(true); }}>Edit</button><button className="button button-small button-danger-ghost" onClick={() => deleteEmployee(employee)}>Delete</button></div></td>
              </tr>
            ))}</tbody>
          </table></div>
        ) : <div className="empty-state"><div className="empty-icon">⌕</div><strong>{query ? 'No matching employees' : 'Your directory is empty'}</strong><span>{query ? 'Try another name, email or department.' : 'Add an employee to start building your directory.'}</span>{!query && <button className="button button-secondary" onClick={() => setDialogOpen(true)}>＋ Add employee</button>}</div>}
      </section>
      {dialogOpen && <EmployeeDialog employee={dialogEmployee} departments={departments} onClose={() => setDialogOpen(false)} onSave={save} />}
    </>
  );
}

import { useState } from 'react';
import useDepartmentController from '../../controllers/useDepartmentController';

function DepartmentDialog({ department, onClose, onSave }) {
  const [form, setForm] = useState(department || { name: '', description: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal modal-compact" role="dialog" aria-modal="true" aria-labelledby="department-dialog-title">
        <div className="modal-heading"><div><div className="eyebrow">{department ? 'EDIT TEAM' : 'NEW TEAM'}</div><h2 id="department-dialog-title">{department ? 'Edit department' : 'Add department'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close dialog">×</button></div>
        {error && <div className="alert alert-error" role="alert">{error}</div>}
        <form className="form-stack" onSubmit={submit}>
          <label className="field"><span>Department name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
          <label className="field"><span>Description</span><textarea rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /></label>
          <div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary" disabled={saving}>{saving ? 'Saving…' : department ? 'Save changes' : 'Create department'}</button></div>
        </form>
      </section>
    </div>
  );
}

export default function DepartmentsView() {
  const { departments, loading, error, save, remove } = useDepartmentController();
  const [dialogDepartment, setDialogDepartment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionError, setActionError] = useState('');

  const deleteDepartment = async (department) => {
    if (!window.confirm(`Delete the ${department.name} department?`)) return;
    setActionError('');
    try {
      await remove(department._id);
    } catch (requestError) {
      setActionError(requestError.message);
    }
  };

  return (
    <>
      <header className="page-heading">
        <div><div className="eyebrow">ORGANIZATION</div><h1>Departments</h1><p>Group your people into teams and departments.</p></div>
        <button className="button button-primary" onClick={() => { setDialogDepartment(null); setDialogOpen(true); }}>＋ Add department</button>
      </header>
      {(error || actionError) && <div className="alert alert-error" role="alert">{actionError || error}</div>}
      <section className="panel">
        <div className="panel-heading"><div><h2>Your departments <span className="count-pill">{departments.length}</span></h2><p>Manage teams across your organization</p></div></div>
        {loading ? <div className="empty-state">Loading departments…</div> : departments.length ? (
          <div className="department-grid">{departments.map((department, index) => (
            <article className="department-card" key={department._id}>
              <div className={`department-icon department-icon-${index % 4}`}>◫</div>
              <div className="department-title-row"><h3>{department.name}</h3><span className="department-index">{String(index + 1).padStart(2, '0')}</span></div>
              <p>{department.description}</p>
              <div className="department-actions"><button className="button button-small button-outline" onClick={() => { setDialogDepartment(department); setDialogOpen(true); }}>Edit</button><button className="button button-small button-danger-ghost" onClick={() => deleteDepartment(department)}>Delete</button></div>
            </article>
          ))}</div>
        ) : <div className="empty-state"><div className="empty-icon">◫</div><strong>No departments yet</strong><span>Create departments to keep your organization structured.</span><button className="button button-secondary" onClick={() => setDialogOpen(true)}>＋ Add department</button></div>}
      </section>
      {dialogOpen && <DepartmentDialog department={dialogDepartment} onClose={() => setDialogOpen(false)} onSave={save} />}
    </>
  );
}

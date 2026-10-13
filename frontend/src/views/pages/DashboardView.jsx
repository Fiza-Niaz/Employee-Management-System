import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmployeeController from '../../controllers/useEmployeeController';
import { apiRequest } from '../../config/apiConfig';

const money = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}).format(Number(value) || 0);

export default function DashboardView() {
  const { employees, loading, error } = useEmployeeController();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    apiRequest('/departments')
      .then(setDepartments)
      .catch(() => setDepartments([]));
  }, []);

  const payroll = employees.reduce((total, employee) => total + (Number(employee.salary) || 0), 0);
  const recentEmployees = [...employees].slice(-5).reverse();

  return (
    <>
      <header className="page-heading">
        <div>
          <div className="eyebrow">OVERVIEW</div>
          <h1>Good to see you</h1>
          <p>Here’s what’s happening across your organization.</p>
        </div>
        <Link className="button button-primary" to="/employees">＋ Add employee</Link>
      </header>

      {error && <div className="alert alert-error" role="alert">{error}</div>}

      <section className="stats-grid" aria-label="Organization overview">
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon icon-blue">♙</span><span className="stat-caption">PEOPLE</span></div>
          <strong className="stat-value">{loading ? '—' : employees.length}</strong>
          <span className="stat-label">Total employees</span>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon icon-violet">◫</span><span className="stat-caption">TEAMS</span></div>
          <strong className="stat-value">{departments.length}</strong>
          <span className="stat-label">Departments</span>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon icon-green">$</span><span className="stat-caption">PAYROLL</span></div>
          <strong className="stat-value">{loading ? '—' : money(payroll)}</strong>
          <span className="stat-label">Combined annual salary</span>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Team members</h2><p>Your recently added employees</p></div>
          <Link className="text-link" to="/employees">View all employees <span aria-hidden="true">→</span></Link>
        </div>
        {loading ? <div className="empty-state">Loading your team…</div> : (
          recentEmployees.length ? (
            <div className="table-wrap">
              <table>
                <thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>EMAIL</th><th>SALARY</th></tr></thead>
                <tbody>{recentEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td><div className="employee-cell"><img className="avatar" src={employee.image} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} /><span className="employee-name">{employee.name}</span></div></td>
                    <td><span className="tag">{employee.department}</span></td>
                    <td className="muted-cell">{employee.email}</td>
                    <td>{money(employee.salary)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          ) : <div className="empty-state"><div className="empty-icon">♙</div><strong>No employees yet</strong><span>Add your first team member to get started.</span><Link className="button button-secondary" to="/employees">Manage employees</Link></div>
        )}
      </section>

      <section className="welcome-banner">
        <div><span className="banner-kicker">YOUR WORKSPACE</span><h2>Build a happier, more organized team.</h2><p>Keep employee details and departments in one clear place.</p></div>
        <Link className="button button-light" to="/departments">Explore departments <span aria-hidden="true">→</span></Link>
        <div className="banner-decoration" aria-hidden="true">✳</div>
      </section>
    </>
  );
}

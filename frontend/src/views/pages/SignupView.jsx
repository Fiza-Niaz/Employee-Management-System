import { Link } from 'react-router-dom';

export default function SignupView() {
  return (
    <main className="auth-page">
      <section className="auth-card signup-card">
        <div className="auth-logo"><span className="brand-mark">P</span> People<span className="brand-light">Desk</span></div>
        <div className="auth-eyebrow">ACCOUNT ACCESS</div>
        <h1>Accounts are managed by your admin</h1>
        <p className="auth-description">
          Public registration is disabled to protect employee data. Ask your system administrator to provision an account.
        </p>
        <div className="setup-note">
          <strong>Setting up this project?</strong>
          <span>Configure the administrator in <code>backend/.env</code>, then run <code>npm run seed:admin</code> from the backend folder.</span>
        </div>
        <Link className="button button-primary button-wide button-link" to="/login">Back to sign in</Link>
      </section>
      <p className="auth-copyright">PeopleDesk · Employee management made simple</p>
    </main>
  );
}

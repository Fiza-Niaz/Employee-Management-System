import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthController from '../../controllers/useAuthController';

export default function LoginView() {
  const { signIn } = useAuthController();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(form);
      navigate('/', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-logo"><span className="brand-mark">P</span> People<span className="brand-light">Desk</span></div>
        <div className="auth-eyebrow">EMPLOYEE MANAGEMENT</div>
        <h1>Welcome back</h1>
        <p className="auth-description">Sign in to manage your people and workplace.</p>
        {error && <div className="alert alert-error" role="alert">{error}</div>}
        <form className="form-stack" onSubmit={submit}>
          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              placeholder="you@company.com"
              autoComplete="username"
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={update}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="button button-primary button-wide" type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="auth-footnote">Need access? <Link to="/signup">Request an account</Link></p>
      </section>
      <p className="auth-copyright">PeopleDesk · Employee management made simple</p>
    </main>
  );
}

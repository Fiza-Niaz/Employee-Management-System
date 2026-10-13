import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: '▦', end: true },
  { to: '/employees', label: 'Employees', icon: '♙' },
  { to: '/departments', label: 'Departments', icon: '◫' },
  { to: '/profile', label: 'Profile', icon: '◎' }
];

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">P</span>
        <span>People<span className="brand-light">Desk</span></span>
      </NavLink>

      <div className="sidebar-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon" aria-hidden="true">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="avatar avatar-small">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
          <div className="sidebar-user-copy">
            <strong>{user?.name || 'Administrator'}</strong>
            <span>Administrator</span>
          </div>
        </div>
        <button className="nav-link logout-button" onClick={onLogout} type="button">
          <span className="nav-icon" aria-hidden="true">↪</span>
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

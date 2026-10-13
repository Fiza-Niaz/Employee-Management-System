import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import useAuthController from './controllers/useAuthController';
import Sidebar from './views/components/Sidebar';
import LoginView from './views/pages/LoginView';
import SignupView from './views/pages/SignupView';
import DashboardView from './views/pages/DashboardView';
import EmployeesView from './views/pages/EmployeesView';
import DepartmentsView from './views/pages/DepartmentsView';
import ProfileView from './views/pages/ProfileView';

function ProtectedLayout() {
  const { user, isAuthenticated, signOut } = useAuthController();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="app-shell">
      <Sidebar user={user} onLogout={() => { signOut(); navigate('/login', { replace: true }); }} />
      <main className="main-area">
        <div className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{location.pathname === '/' ? 'Dashboard' : location.pathname.slice(1).replace(/^\w/, (letter) => letter.toUpperCase())}</strong></div>
          <div className="topbar-right"><span className="online-dot" /> <span>Workspace active</span><div className="avatar avatar-small">{user?.name?.[0]?.toUpperCase() || 'A'}</div></div>
        </div>
        <div className="page-content"><Outlet /></div>
        <footer className="app-footer"><span>PeopleDesk</span><span>Employee management, made simple.</span></footer>
      </main>
    </div>
  );
}

function AuthenticatedRedirect() {
  const { isAuthenticated } = useAuthController();
  return <Navigate to={isAuthenticated ? '/' : '/login'} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/signup" element={<SignupView />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardView />} />
        <Route path="/employees" element={<EmployeesView />} />
        <Route path="/departments" element={<DepartmentsView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Route>
      <Route path="*" element={<AuthenticatedRedirect />} />
    </Routes>
  );
}

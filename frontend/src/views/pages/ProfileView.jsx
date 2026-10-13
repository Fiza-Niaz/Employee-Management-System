import useAuthController from '../../controllers/useAuthController';

export default function ProfileView() {
  const { user } = useAuthController();
  return (
    <>
      <header className="page-heading"><div><div className="eyebrow">ACCOUNT</div><h1>Your profile</h1><p>Administrator account details.</p></div></header>
      <section className="panel profile-panel">
        <div className="profile-avatar">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
        <div><div className="eyebrow">ADMINISTRATOR</div><h2>{user?.name || 'Administrator'}</h2><p className="muted-cell">{user?.email}</p></div>
      </section>
    </>
  );
}

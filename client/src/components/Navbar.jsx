import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, ShieldCheck, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <CheckSquare size={22} className="brand-icon" />
        <span>TaskFlow</span>
      </div>

      {user && (
        <div className="navbar-links">
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          {user.role === 'admin' && (
            <Link
              to="/admin"
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              <ShieldCheck size={16} />
              Admin Panel
            </Link>
          )}
        </div>
      )}

      {user && (
        <div className="navbar-right">
          <div className="user-pill">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <span className="user-name">{user.name}</span>
            {user.role === 'admin' && <span className="badge-admin">Admin</span>}
          </div>
          <button className="btn-icon logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

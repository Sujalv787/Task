import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { Users, ListChecks, Trash2, ShieldCheck } from 'lucide-react';

const AdminPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [filterUser, setFilterUser] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [tasksRes, usersRes] = await Promise.all([
        api.get('/tasks/admin/all', { params: filterUser ? { userId: filterUser } : {} }),
        api.get('/tasks/admin/users'),
      ]);
      setTasks(tasksRes.data);
      setUsers(usersRes.data);
    } catch {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterUser]);

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleUpdateTask = async (payload) => {
    try {
      const { data } = await api.put(`/tasks/${editingTask._id}`, payload);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      setEditingTask(null);
      toast.success('Task updated');
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('This will delete the user and ALL their tasks. Proceed?')) return;
    try {
      await api.delete(`/tasks/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setTasks((prev) => prev.filter((t) => t.user?._id !== userId));
      toast.success('User and tasks deleted');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const adminStats = [
    { label: 'Total Users', value: users.length, icon: Users },
    { label: 'Total Tasks', value: tasks.length, icon: ListChecks },
    {
      label: 'Completed', 
      value: tasks.filter((t) => t.status === 'done').length,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-subtitle">Manage all users and tasks</p>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="stats-row">
        {adminStats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="stat-card stat-total">
            <div className="stat-icon">
              <Icon size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-count">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
          id="tab-tasks"
        >
          <ListChecks size={16} /> All Tasks ({tasks.length})
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
          id="tab-users"
        >
          <Users size={16} /> All Users ({users.length})
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading admin data...</p>
        </div>
      ) : activeTab === 'tasks' ? (
        <>
          {/* Filter by user */}
          <div className="filters-bar">
            <select
              className="filter-select"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              id="admin-filter-user"
            >
              <option value="">All Users</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <ListChecks size={48} opacity={0.3} />
              <h3>No tasks found</h3>
            </div>
          ) : (
            <div className="task-grid">
              {tasks.map((task) => (
                <div key={task._id}>
                  <div className="task-owner-label">
                    <Users size={12} />
                    {task.user?.name} · {task.user?.email}
                  </div>
                  <TaskCard
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Users Tab */
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Tasks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar sm">{u.name.charAt(0).toUpperCase()}</div>
                      {u.name}
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge role-${u.role}`}>{u.role}</span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>{tasks.filter((t) => t.user?._id === u._id).length}</td>
                  <td>
                    {u.role !== 'admin' && (
                      <button
                        className="btn-icon delete-btn"
                        onClick={() => handleDeleteUser(u._id)}
                        title="Delete user"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdateTask}
        initialData={editingTask}
      />
    </div>
  );
};

export default AdminPanel;

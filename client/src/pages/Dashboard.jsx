import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { Plus, Search, SlidersHorizontal, CheckCircle2, Clock3, ListTodo } from 'lucide-react';

const STATS_CONFIG = [
  { key: 'todo', label: 'To Do', icon: ListTodo, color: 'stat-todo' },
  { key: 'in-progress', label: 'In Progress', icon: Clock3, color: 'stat-progress' },
  { key: 'done', label: 'Done', icon: CheckCircle2, color: 'stat-done' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;

      const { data } = await api.get('/tasks', { params });
      setTasks(data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (payload) => {
    try {
      const { data } = await api.post('/tasks', payload);
      setTasks((prev) => [data, ...prev]);
      setIsModalOpen(false);
      toast.success('Task created! ✅');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (payload) => {
    try {
      const { data } = await api.put(`/tasks/${editingTask._id}`, payload);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      setEditingTask(null);
      toast.success('Task updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
    }
  };

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

  const openEdit = (task) => {
    setEditingTask(task);
  };

  const stats = STATS_CONFIG.map((s) => ({
    ...s,
    count: tasks.filter((t) => t.status === s.key).length,
  }));

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Tasks</h1>
          <p className="page-subtitle">Welcome back, {user?.name} 👋</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} id="new-task-btn">
          <Plus size={18} />
          New Task
        </button>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        {stats.map(({ key, label, icon: Icon, color, count }) => (
          <div key={key} className={`stat-card ${color}`}>
            <div className="stat-icon">
              <Icon size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-count">{count}</span>
              <span className="stat-label">{label}</span>
            </div>
          </div>
        ))}
        <div className="stat-card stat-total">
          <div className="stat-info">
            <span className="stat-count">{tasks.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            id="task-search"
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <SlidersHorizontal size={16} />
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            id="filter-priority"
            value={filters.priority}
            onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value }))}
            className="filter-select"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Task Grid */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <ListTodo size={56} opacity={0.3} />
          <h3>No tasks yet</h3>
          <p>Create your first task to get started</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> New Task
          </button>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEdit}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
      <TaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdateTask}
        initialData={editingTask}
      />
    </div>
  );
};

export default Dashboard;

import { Clock, Tag, Pencil, Trash2, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

const STATUS_ICONS = {
  'todo': <AlertCircle size={14} />,
  'in-progress': <ArrowRight size={14} />,
  'done': <CheckCircle2 size={14} />,
};

const STATUS_LABELS = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

const PRIORITY_COLORS = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const isOverdue = (dateStr, status) => {
  if (!dateStr || status === 'done') return false;
  return new Date(dateStr) < new Date();
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className={`task-card status-${task.status}`}>
      <div className="task-card-header">
        <span className={`status-badge status-${task.status}`}>
          {STATUS_ICONS[task.status]}
          {STATUS_LABELS[task.status]}
        </span>
        <span className={`priority-badge ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {task.tags && task.tags.length > 0 && (
        <div className="task-tags">
          <Tag size={12} />
          {task.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {task.dueDate && (
        <div className={`task-due ${overdue ? 'overdue' : ''}`}>
          <Clock size={13} />
          <span>{overdue ? 'Overdue · ' : 'Due: '}{formatDate(task.dueDate)}</span>
        </div>
      )}

      <div className="task-card-actions">
        <button className="btn-icon edit-btn" onClick={() => onEdit(task)} title="Edit task">
          <Pencil size={15} />
        </button>
        <button className="btn-icon delete-btn" onClick={() => onDelete(task._id)} title="Delete task">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

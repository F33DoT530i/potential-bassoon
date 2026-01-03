import React from 'react';
import { Task } from '../types';
import { formatDate } from '../utils/helpers';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`task-status ${task.status}`}>
        {task.status.replace('-', ' ').toUpperCase()}
      </span>
      <div className="task-date">Created: {formatDate(task.createdAt)}</div>
      <div className="task-actions">
        <button className="btn btn-primary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

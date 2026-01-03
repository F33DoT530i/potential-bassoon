import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (title: string, description: string, status: Task['status']) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('pending');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, status);
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  return (
    <div className="form-container">
      <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task['status'])}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {task ? 'Update Task' : 'Create Task'}
          </button>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            style={{ width: '100%' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

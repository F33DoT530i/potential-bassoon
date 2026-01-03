import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { Task } from '../types';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (
    title: string,
    description: string,
    status: Task['status']
  ) => {
    try {
      await taskAPI.createTask(title, description, status);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleUpdateTask = async (
    title: string,
    description: string,
    status: Task['status']
  ) => {
    if (!editingTask) return;

    try {
      await taskAPI.updateTask(editingTask._id, { title, description, status });
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskAPI.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (showForm) {
    return (
      <TaskForm
        task={editingTask}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div className="container">
      <div className="tasks-header">
        <h2>My Tasks</h2>
        <button className="btn btn-success" onClick={() => setShowForm(true)}>
          + New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

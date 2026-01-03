export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  status: string;
  results: number;
  data: {
    tasks: Task[];
  };
}

export interface TaskResponse {
  status: string;
  data: {
    task: Task;
  };
}

import app from './app';
import { config } from './config';
import { connectDB } from './config/database';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(config.port, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

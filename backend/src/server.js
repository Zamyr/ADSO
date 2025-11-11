import app from './app.js';
import { testConnection } from './config/database.js';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    const connected = await testConnection();

    if (!connected) {
      console.error('Failed to connect to database');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

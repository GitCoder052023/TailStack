import app from './app';
import { config } from './config';
import { initializeCluster } from './cluster';

initializeCluster(() => {
  const server = app.listen(config.port, () => {
    console.log(`✅ Worker ${process.pid} started on port ${config.port}`);
  });

  // Graceful shutdown
  const gracefulShutdown = (signal: string) => {
    console.log(`${signal} signal received: closing HTTP server for worker ${process.pid}`);
    server.close(() => {
      console.log(`HTTP server closed for worker ${process.pid}`);
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
});



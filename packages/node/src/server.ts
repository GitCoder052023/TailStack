import { ClusterManager } from './cluster';
import app from './app';
import { config } from './config';

if (ClusterManager.isPrimary) {
  ClusterManager.spawnWorkers();
} else {
  const server = app.listen(config.port, () => {
    console.log(`🚀 Worker ${ClusterManager.getWorkerId()} started on port ${config.port}`);
    console.log(`📡 Environment: ${config.nodeEnv}`);
    console.log(`🌐 CORS enabled for: ${config.corsOrigin}`);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`${signal} signal received: closing HTTP server on worker ${ClusterManager.getWorkerId()}`);
    server.close(() => {
      console.log(`HTTP server closed on worker ${ClusterManager.getWorkerId()}`);
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}



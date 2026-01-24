import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { config } from '../config';
import { CLUSTER_CONFIG } from '../constant/cluster';

export const initializeCluster = (workerCallback: () => void) => {
  if (cluster.isPrimary) {
    const numCPUs = config.workers || availableParallelism();
    
    console.log(`🚀 Primary process ${process.pid} is running`);
    console.log(`📡 Environment: ${config.nodeEnv}`);
    console.log(`🌐 CORS enabled for: ${config.corsOrigin}`);
    console.log(`⚙️ Spawning ${numCPUs} workers for maximum performance...\n`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`⚠️ Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}).`);
      console.log(`🔄 Restarting in ${CLUSTER_CONFIG.RESTART_DELAY}ms...`);
      
      setTimeout(() => {
        cluster.fork();
      }, CLUSTER_CONFIG.RESTART_DELAY);
    });
  } else {
    workerCallback();
  }
};

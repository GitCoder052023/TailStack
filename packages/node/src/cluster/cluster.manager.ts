import cluster from 'node:cluster';
import { NUMBER_OF_CPUS } from '../constant';

/**
 * Manages the node cluster, spawning workers and handling their lifecycle.
 */
export const ClusterManager = {
  /**
   * Checks if the current process is the primary process.
   */
  isPrimary: cluster.isPrimary,

  /**
   * Spawns worker processes based on the number of available CPUs.
   */
  spawnWorkers: () => {
    console.log(`Master ${process.pid} is running. Spawning ${NUMBER_OF_CPUS} workers...`);

    for (let i = 0; i < NUMBER_OF_CPUS; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
      cluster.fork();
    });
  },

  /**
   * Helper to identify the current worker PID.
   */
  getWorkerId: () => process.pid,
};

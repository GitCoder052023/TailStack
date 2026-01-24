import os from 'node:os';

export const NUMBER_OF_CPUS = os.cpus().length;
export const CLUSTER_RESTART_DELAY = 1000; // Delay before restarting a worker if needed

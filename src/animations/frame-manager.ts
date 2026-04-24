export class FrameManager {

    private static taskQueue: Array <() => void> = [];
    private static priorityQueue: Array<() => void> = [];
    private static lastTimestamp = 0;
    private static frameBudget = 8;


    public static metrics = {
        fps: 0,
        throttled: false,
        taskCount: 0
};


static schedule(task: () => void, isPriority: boolean = false): void {
    if (isPriority) {
        this.priorityQueue.push(task);
    } else { 
        this.taskQueue.push(task);
    }
    this.metrics.taskCount = this.priorityQueue.length + this.taskQueue.length;
}


static run(timestamp: number): void {
    const delta = timestamp - this.lastTimestamp;
    this.metrics.fps = Math.round(1000 / delta);
    this.lastTimestamp = timestamp;


    const start = perfomance.now();



    while (this.priorityQueue.length > 0) {
        this.priorityQueue.shift()?.();
    }


    this.metrics.throttled = false;
    while (this.taskQueue.length > 0) {
        if (perfomance.now() - start > this.frameBudget) {
            this.metrics.throttled = true;
            break;
        }
        this.taskQueue.shift()?.();
    }
}


static getStatus() { 
     return `FPS: ${this.metrics.fps} | Throttled: ${this.metrics.throttled ? 'YES' : 'NO'}`;
  }
}


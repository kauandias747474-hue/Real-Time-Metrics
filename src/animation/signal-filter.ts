export class SignalFilter { 
   private lastValue: number = 0;
   private velocity: number = 0;
   private isInitialized: boolean = false;
   private history: Float32Array;
   private ptr: number = 0;


   constructor(private windowSize: number = 10) {
    this.history = new Float32Array(windowSize);
   }



   public stabilize(newValue: number, alpha: number = 0.15): number {
    try {
        if (!Number.isFinite(newValue)) return this.lastValue;


        if (!this.isInitialized) return this.init(newValue);



        const mean = this.getMean();
        const stdDev = this.getStdDev(mean);
        if (Math.abs(newValue - mean) > stdDev * 3 && stdDev > 0) {

            newValue = mean + (newValue - mean) * 0.05;
        }


        const currentVelocity = newValue - this.lastValue;
        this.velocity = (currentVelocity * alpha) + (this.velocity * (1- alpha));




        const filtered = (newValue * alpha) + (this.lastValue * (1 - alpha)) + (this.velocity * 0.1);


        this.updateHistory(filtered);
        this.lastValue = filtered;


        return filtered;
    } catch { 
        return this.lastValue;
    }
}



  private init(val: number): number {
    this.lastValue = val;
    this.isInitialized = true;
    this.history.fill(val);
    return val;
  }


  private updateHistory(val: number): void {
    this.history[this.ptr] = val;
    this.ptr = (this.ptr + 1) % this.windowSize;
  }


  private getMean(): number {
    let sum = 0;
    for (let i = 0; i < this.windowSize; i++) sum += this.history[i];
    return sum / this.windowSize;
  }


  private getStdDev(mean: number): number {
    let sumSq = 0;
    for (let i = 0; i < this.windowSize; i++) {
        sumSq += Math.pow(this.history[i] - mean, 2);
    }
    return Math.sqrt(sumSq / this.windowSize);
   }
}

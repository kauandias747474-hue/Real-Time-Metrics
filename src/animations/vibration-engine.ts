


export type VibrationPattern = 'IMPACT' | 'WARNING' | 'CRITICAL_FAILURE' | 'SUCCESS' | 'EMERGENCY';

export interface VibrationMetrics {
  totalVibrations: number;
  lastPattern: VibrationPattern | null;
  isActive: boolean;
}

export class VibrationEngine {
  private static isHardwareEnabled = typeof navigator !== 'undefined' && !!navigator.vibrate;
  private static isBusy = false;
  private static sessionMetrics: VibrationMetrics = {
    totalVibrations: 0,
    lastPattern: null,
    isActive: false
  };

  private static readonly SEQUENCES: Record<VibrationPattern, number[]> = {
    IMPACT: [15, 30, 15],
    WARNING: [100, 50, 100],
    CRITICAL_FAILURE: [500, 100, 500, 100, 500],
    SUCCESS: [50],
    EMERGENCY: [1000, 200, 1000]
  };

  private static readonly INTENSITY_MAP = {
    LOW: 20,
    MEDIUM: 50,
    HIGH: 100
  };

  static trigger(pattern: VibrationPattern): boolean {
    if (!this.isHardwareEnabled || this.isBusy) return false;

    const sequence = this.SEQUENCES[pattern];
    this.isBusy = true;
    this.sessionMetrics.isActive = true;
    this.sessionMetrics.lastPattern = pattern;
    this.sessionMetrics.totalVibrations++;
    
    const success = navigator.vibrate(sequence);

    const totalDuration = sequence.reduce((acc, val) => acc + val, 0);
    setTimeout(() => {
      this.isBusy = false;
      this.sessionMetrics.isActive = false;
    }, totalDuration);

    return success;
  }

  static pulseByIntensity(value: number, threshold: number = 80): void {
    if (!this.isHardwareEnabled || value < threshold) return;
    
    const intensity = AnimationMath.clamp((value - threshold) * 2, 10, 100);
    const duration = (intensity / 100) * 60;
    
    navigator.vibrate(duration);
  }

  static sequence(patterns: VibrationPattern[]): void {
    if (!this.isHardwareEnabled) return;
    
    let delay = 0;
    patterns.forEach((p) => {
      const duration = this.SEQUENCES[p].reduce((a, b) => a + b, 0);
      setTimeout(() => this.trigger(p), delay);
      delay += duration + 100;
    });
  }

  static getMetrics(): VibrationMetrics {
    return { ...this.sessionMetrics };
  }

  static stop(): void {
    if (this.isHardwareEnabled) {
      navigator.vibrate(0);
      this.isBusy = false;
    }
  }
}

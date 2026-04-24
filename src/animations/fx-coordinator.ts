// src/animations/fx-coordinator.ts

import { AnimationMath } from './easing';
import { FrameManager } from './frame-manager';
import { VibrationEngine } from './vibration-engine';

export interface FXConfig {
  enableGhosting: boolean;
  interpolationFactor: number;
  criticalThreshold: number;
}

export class FXCoordinator {
  private static displayValue = 0;
  private static lastValue = 0;
  private static ghostPool: HTMLElement[] = [];
  private static readonly POOL_LIMIT = 25;
  
  private static config: FXConfig = {
    enableGhosting: true,
    interpolationFactor: 0.12,
    criticalThreshold: 92
  };

  private static history: number[] = [];

  static setConfig(newConfig: Partial<FXConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  static sync(targetValue: number, element: HTMLElement): void {
    const smoothed = AnimationMath.smoothSignal(targetValue);
    
    this.displayValue = AnimationMath.lerp(
      this.displayValue, 
      smoothed, 
      this.config.interpolationFactor
    );
    
    const velocity = this.displayValue - this.lastValue;
    const isCritical = this.displayValue > this.config.criticalThreshold;

    this.history.push(this.displayValue);
    if (this.history.length > 30) this.history.shift();

    FrameManager.schedule(() => {
      this.applyPrimaryTransforms(element, this.displayValue, velocity, isCritical);
    }, true);

    if (this.config.enableGhosting && Math.abs(velocity) > 18) {
      FrameManager.schedule(() => this.spawnGhost(element, velocity));
    }

    if (isCritical && Math.abs(velocity) > 5) {
      VibrationEngine.trigger('CRITICAL_FAILURE');
    }

    this.lastValue = this.displayValue;
  }

  private static applyPrimaryTransforms(el: HTMLElement, val: number, vel: number, crit: boolean): void {
    const scale = AnimationMath.clamp(1 + Math.abs(vel) * 0.007, 1, 1.3);
    const skew = AnimationMath.clamp(vel * 0.6, -25, 25);
    const hue = AnimationMath.lerp(140, 0, val / 100);

    const matrix = `scale(${scale}) skewX(${skew}deg) translateZ(0)`;
    el.style.transform = matrix;
    el.style.color = `hsl(${hue}, 100%, 50%)`;
    
    if (crit) {
      const time = performance.now() / 1000;
      const shakeX = AnimationMath.alertShake(time, 1.5);
      const shakeY = AnimationMath.alertShake(time + 1, 1.5);
      
      el.style.filter = `drop-shadow(0 0 15px hsla(0, 100%, 50%, 0.8)) brightness(1.4)`;
      el.style.translate = `${shakeX * 10}px ${shakeY * 5}px`;
    } else {
      el.style.filter = `drop-shadow(0 0 8px hsla(${hue}, 100%, 50%, 0.3))`;
      el.style.translate = '0px 0px';
    }
  }

  private static spawnGhost(el: HTMLElement, vel: number): void {
    const ghost = this.ghostPool.pop() || (el.cloneNode(true) as HTMLElement);
    
    Object.assign(ghost.style, {
      position: 'absolute',
      pointerEvents: 'none',
      opacity: '0.4',
      zIndex: '-1',
      transition: 'none',
      filter: 'blur(2px) brightness(2)',
      transform: el.style.transform
    });
    
    el.parentElement?.appendChild(ghost);

    setTimeout(() => {
      ghost.remove();
      if (this.ghostPool.length < this.POOL_LIMIT) {
        this.ghostPool.push(ghost);
      }
    }, 200);
  }

  static getTrend(): 'RISING' | 'FALLING' | 'STABLE' {
    if (this.history.length < 2) return 'STABLE';
    const first = this.history[0];
    const last = this.history[this.history.length - 1];
    return last > first ? 'RISING' : last < first ? 'FALLING' : 'STABLE';
  }
}

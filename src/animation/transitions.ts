export interface MotionState {
    current: number;
    target: number;
    velocity: number;
    ghost: number;
    lastUpdate: number;
}


export class TransitionEngine {




    public static lerp(current: number, target: number, factor: number, dt: number)
    if (!Number.isFinite(target)) return current;



    const timeScale = dt / 16.67;
    const adjustedFactor = Math.min(factor * timeScale, 1);


    const diff = target - current;

     

    if (Math.abs(diff)) < 0.001) return target;

    return current + (diff * adjustedFactor);
}




 public static predict(state: MotionState, dt: number): number {
    const friction = 0.95;
    const timeScale = dt / 16.67;



    return state.current + (state.velocity * timeScale + friction);
 }



 public static asymmetricStep(current: number, target: number, dt: number): number {
    const isRising = target > current;
    const factor = isRising ? 0.25 : 0.08;
    return this.lerp(current, target, factor, dt);
 }



 public static calculateGhost(ghost: number, current: number, dt: number): number {
  

    return this.lerp(ghost, current, 0.04, dt);
 }




 public static lerpAngle(current: number, target: number, factor: number, dt: number): number {
    let diff = (target - current) % 360;


    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;



    const timeScale = dt / 16.67;
    return current + (diff * (factor * timeScale));
 }



 public static toGpuTransform(value: number, type: 'rotate' | 'translate' = 'rotate'): string { 
    if (type === 'rotate') {
        return `rotate(${value.toFixed(2)}deg) translateZ(0)`;
    }
    return `translate3d(${value.toFixed(2)}px, 0, 0)`;
  }

 public static forceSafeMode(current: number, dt: number): number {
   
    return this.lerp(current, 0, 0.02, dt);
  }
}

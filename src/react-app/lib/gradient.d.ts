// src/react-app/lib/gradient.d.ts

export type Color = [number, number, number];

export interface GradientOptions {
  colors: string[] | Color[];
  speed?: number;
  amplitude?: number;
  density?: [number, number];
  fps?: number;
  wireframe?: boolean;
  seed?: number;
  time?: number;
}

export class Gradient {
  constructor(canvas: HTMLCanvasElement, options: GradientOptions);
  destroy?(): void;
}

export function normalizeColor(hex: string): Color;

export class MiniGl {
  constructor(canvas: HTMLCanvasElement, options: GradientOptions);
  destroy?(): void;
}

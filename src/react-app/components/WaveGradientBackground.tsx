import React, { useEffect, useRef, useMemo } from "react";

import { WaveGradient } from "wave-gradient";


interface WaveGradientBackgroundProps {
  colors?: string[];
  speed?: number;
  amplitude?: number;
  density?: [number, number];
  fps?: number;
  wireframe?: boolean;
  /** If true, convert all color stops to true grayscale before passing to the shader */
  neutralize?: boolean;
  /** If true, apply a CSS desaturation filter to the canvas (forces grayscale at the DOM level) */
  desaturate?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const DEFAULTS = {
  colors: [
    "#040614", "#05061a", "#07072e", "#090843", "#0c0a57",
    "#0e0b6b", "#11107f", "#141293", "#1714a8", "#1a16bc",
  ],
  speed: 1.25,
  amplitude: 320,
  density: [0.06, 0.16] as [number, number],
  fps: 30,
  wireframe: false,
  desaturate: false,
};

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  if (normalized.length === 3) {
    const r = parseInt(normalized[0] + normalized[0], 16);
    const g = parseInt(normalized[1] + normalized[1], 16);
    const b = parseInt(normalized[2] + normalized[2], 16);
    return { r, g, b };
  }
  if (normalized.length === 6) {
    const r = parseInt(normalized.substr(0, 2), 16);
    const g = parseInt(normalized.substr(2, 2), 16);
    const b = parseInt(normalized.substr(4, 2), 16);
    return { r, g, b };
  }
  return null;
}
function toHex(n: number) {
  const h = Math.max(0, Math.min(255, Math.round(n))).toString(16);
  return h.length === 1 ? "0" + h : h;
}

const WaveGradientBackground: React.FC<WaveGradientBackgroundProps> = (props) => {
  const {
    colors = DEFAULTS.colors,
    speed = DEFAULTS.speed,
    amplitude = DEFAULTS.amplitude,
    density = DEFAULTS.density,
    fps = DEFAULTS.fps,
    wireframe = DEFAULTS.wireframe,
    neutralize = false,
    desaturate = false,
    style,
    className,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Optionally convert colors to strict grayscale stops
  const finalColors = useMemo(() => {
    if (!neutralize) return colors;
    return colors.map((c) => {
      const rgb = hexToRgb(c);
      if (!rgb) return c;
      const l = Math.round((rgb.r + rgb.g + rgb.b) / 3); // simple average desaturation
      const hex = `#${toHex(l)}${toHex(l)}${toHex(l)}`;
      return hex;
    });
  }, [colors, neutralize]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const g = new WaveGradient(canvasRef.current, {
      colors: finalColors,
      speed,
      amplitude,
      density,
      fps,
      wireframe,
      seed: Math.random() * 1000,
      time: 0,
    });

    return () => {
      g.destroy?.();
    };
    // note: finalColors is used so neutralize changes re-create the gradient
  }, [finalColors, speed, amplitude, density, fps, wireframe]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        // Force a neutral background behind the gradient
        backgroundColor: "#ffffff",
        // Avoid accidental blending with siblings
        mixBlendMode: "normal",
        // DOM-level desaturation if requested
        filter: desaturate ? "saturate(0) contrast(1)" : undefined,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
};

export default WaveGradientBackground;

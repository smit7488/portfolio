import React, { useEffect, useRef } from "react";
import { WaveGradient } from "wave-gradient";

interface WaveGradientBackgroundProps {
  colors?: string[];
  speed?: number;
  amplitude?: number;
  density?: [number, number];
  fps?: number;
  wireframe?: boolean;
}

const WaveGradientBackground: React.FC<WaveGradientBackgroundProps> = ({
  colors = [ "#040614", "#05061a", "#07072e", "#090843", "#0c0a57",
  "#0e0b6b", "#11107f", "#141293", "#1714a8", "#1a16bc"],
  speed = 1.25,
  amplitude = 320,
  density = [0.06, 0.16],
  fps = 30,
  wireframe = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const gradient = new WaveGradient(canvasRef.current, {
      colors,
      speed,
      amplitude,
      density,
      fps,
      wireframe,
      seed: Math.random() * 1000,
      time: 0,
    });

    return () => {
      gradient.destroy?.();
    };
  }, [colors, speed, amplitude, density, fps, wireframe]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
};

export default WaveGradientBackground;

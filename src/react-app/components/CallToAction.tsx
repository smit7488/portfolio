import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WaveGradientBackground from "./WaveGradientBackground";
import { motion } from "framer-motion";
import { bounceIn } from "../animations/motionVariants";

interface WaveGradientBackgroundProps {
  colors?: string[];
  speed?: number;
  amplitude?: number;
  density?: [number, number];
  fps?: number;
  wireframe?: boolean;
}

interface CallToActionProps {
  heading: string;
  subheading?: string;
  bgColor?: string;
  bgImage?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: string;
  className?: string;
  useWaveGradient?: boolean;
  waveProps?: WaveGradientBackgroundProps;
  containerClassName?: string; // <-- new prop
}

const CallToAction: React.FC<CallToActionProps> = ({
  heading,
  subheading,
  bgColor = "",
  bgImage = "",
  textColor = "#ffffff",
  buttonText = "Contact Us",
  buttonLink = "/contact",
  buttonVariant = "gradient",
  className = "",
  useWaveGradient = false,
  waveProps = {},
  containerClassName = "container", // default container class
}) => {
  return (
    <section
      className={`py-5 text-center position-relative overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional Wave Gradient Background */}
      {useWaveGradient && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <WaveGradientBackground {...waveProps} />
        </div>
      )}

      {/* Foreground Content */}
      <div className={containerClassName} style={{ position: "relative", zIndex: 1 }}>
        <div className="my-5 d-flex flex-wrap gap-4 align-items-center justify-content-center justify-content-xxl-between">
          <h2 className="mb-3 cta-heading" style={{ color: textColor }}>
            {heading}
          </h2>
          {subheading && <p className="mb-4">{subheading}</p>}
 <motion.div
                initial="hidden"
                whileInView="visible"
               
                variants={bounceIn}
              >

          
            <Button as={Link as any} to={buttonLink} variant={buttonVariant} size="lg">
              {buttonText}
            </Button>
         </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

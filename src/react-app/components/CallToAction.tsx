import React from "react";
import { Button, Container } from "react-bootstrap";
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
  hasContainer?: boolean;
  containerClassName?: string;
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
  hasContainer = true,
  containerClassName = "",
}) => {
  const ContentWrapper: React.ElementType = hasContainer ? Container : "div";

  return (
    <section
      className={`py-5 text-center position-relative overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
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
      <ContentWrapper
        className={containerClassName}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="my-5 d-flex flex-wrap gap-4 align-items-center justify-content-evenly px-4">
          <div>
            <h2 className="mb-0 text-5xl" style={{ color: textColor }}>
              {heading}
            </h2>
            {subheading && (
              <p className="mb-4 mt-3 text-lg" style={{ color: textColor }}>
                {subheading}
              </p>
            )}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={bounceIn}
          >
              <Button as={Link as any} to={buttonLink} variant={buttonVariant} size="lg">
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default CallToAction;

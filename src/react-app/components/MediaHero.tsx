import React from "react";
import "./MediaHero.css";

interface MediaHeroProps {
  videoSrc?: string;
  imageSrc?: string;
  overlayContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  photoOnly?: boolean;
  className?: string;
  textColor?: string;
  background?: React.ReactNode;
  hasDarkOverlay?: boolean;
  minHeightOnly?: boolean; // <-- new prop
  bgColor?: string;
}

const MediaHero: React.FC<MediaHeroProps> = ({
  videoSrc,
  imageSrc,
  overlayContent,
  bottomContent,
  photoOnly = false,
  className = "",
  textColor = "",
  background,
  hasDarkOverlay,
  minHeightOnly = false,
  bgColor = "",
}) => {
  const applyTextColor = (content: React.ReactNode): React.ReactNode => {
    if (!content) return null;

    if (typeof content === "string") return <span style={{ color: textColor }}>{content}</span>;

    if (React.isValidElement(content)) {
      const element = content as React.ReactElement<any>;
      const existingStyle = (element.props && (element.props as any).style) || {};
      return React.cloneElement(element, {
        style: { ...(existingStyle || {}), color: textColor },
        children: applyTextColor(element.props.children),
      });
    }

    if (Array.isArray(content))
      return content.map((child, idx) => <React.Fragment key={idx}>{applyTextColor(child)}</React.Fragment>);

    return content;
  };

  return (
    <div
      className={`media-hero position-relative ${className} ${minHeightOnly ? "media-hero--min-height" : ""}`} style={{ color: bgColor }}
    >
      {/* Optional base image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Hero fallback"
          className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Optional video */}
      {!photoOnly && videoSrc && (
        <video
          className="w-100 h-100 object-fit-cover position-relative"
          autoPlay
          muted
          loop
          playsInline
          style={{ zIndex: 1 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Optional animated background */}
      {background && (
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
          {background}
        </div>
      )}

      {/* Overlay content */}
      {overlayContent && (
        <div
          className={`overlay top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center ${
            hasDarkOverlay ? "media-hero-overlay" : ""
          }`}
          style={{ zIndex: 3 }}
        >
          {applyTextColor(overlayContent)}
        </div>
      )}

      {/* Bottom content */}
      {bottomContent && (
        <div className="bottom-0 start-50 translate-middle-x mb-4" style={{ zIndex: 4 }}>
          {bottomContent}
        </div>
      )}
    </div>
  );
};

export default MediaHero;

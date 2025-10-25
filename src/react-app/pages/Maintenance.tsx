import MediaHero from "../components/MediaHero";
import tsLogo from "../assets/media/trevor-smith-logo-vertical-ko.svg";
import WaveGradientBackground from "../components/WaveGradientBackground";



export default function Maintenance() {

  return (
    <>
      {/* Hero */}
      <MediaHero
        textColor="#fff"
        className="coming-soon-hero" 
        overlayContent={
          <>
            <img
              src={tsLogo}
              className="logo"
              alt="Trevor & Sarah logo"
            />
            <p
              className="text-uppercase mt-5"
              style={{ letterSpacing: "0.15em" }}
            >
              Site is undergoing maintenance. Please check back later!
            </p>
          </>
        }
          background={<WaveGradientBackground />}
      />
    </>
  );
}

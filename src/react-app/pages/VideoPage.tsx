import { useEffect, useState, JSX } from "react";
import client from "../contentfulClient";
import { MediaItem } from "../types/contentful";
import Grid from "../components/Grid";
import MediaHero from "../components/MediaHero";
import heroImage from "../assets/media/ts-logo-bg.jpg";
import wireblock from "../assets/media/wireblocks/video-wireblock.svg";
import Testimonials from "../components/Testimonials";
import Badge from "react-bootstrap/Badge";
import CallToAction from "../components/CallToAction";
import RandomContentfulInstagramFeed from "../components/RandomContentfulInstagramFeed";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function VideoPage() {
  const [videoItems, setVideoItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "mediaItem",
        include: 2,
      })
      .then((response: any) => {
        // Filter to videos first
        const videos = response.items.filter(
          (item: any) =>
            item.fields.category === "Video" &&
            (item.fields.embed || item.fields.photo?.fields.file.contentType.startsWith("video/"))
        );

        // Sort by sortOrder (undefined or null goes to end)
        videos.sort((a: any, b: any) => {
          const aOrder = a.fields.sortOrder ?? Number.MAX_SAFE_INTEGER;
          const bOrder = b.fields.sortOrder ?? Number.MAX_SAFE_INTEGER;
          return aOrder - bOrder;
        });

        const mapped = videos.map((item: any, idx: number) => {
          const fields: MediaItem["fields"] = item.fields;
          const embed = fields.embed;
          const photo = fields.photo;
          const mediaUrl = photo ? `https:${photo.fields.file.url}` : "";
          const contentType = photo?.fields.file.contentType || "";
          const genres = Array.isArray(fields.genre) ? fields.genre : [];

          return (
            <div key={idx} className="portfolio-card p-3 bg-white border rounded shadow-sm h-100">
              {/* Video or Embed */}
              {contentType.startsWith("video/") && (
                <video src={mediaUrl} className="img-fluid mb-3 rounded" controls playsInline />
              )}
              {typeof embed === "string" && !contentType.startsWith("video/") && (
                <div className="embed-container mb-3">
                  <iframe src={embed} title={fields.title} allowFullScreen />
                </div>
              )}

              {/* Text Content */}
              <div>
                <h5 className="fw-bold mb-2">{fields.title}</h5>
                <div
                  className="d-flex align-items-center text-muted small mb-3 flex-wrap"
                  style={{ gap: ".25rem .75rem" }}
                >
                    {fields.location && (
                 
                    <div>
                      <FaMapMarkerAlt className="me-1 text-muted xx-small" />
                      <span className="text-truncate text-muted xx-small mb-0">{fields.location}</span>
                    </div>
                  
                )}
                  {/* Genre Badges */}
                  <div className="bg-secondary" style={{ borderRadius: "0.25rem" }}>
                    {genres.map((genre: any, gIdx: number) => {
                      const title = genre?.fields?.title || genre?.fields?.name || "Unknown Genre";
                      return (
                        <Badge key={gIdx} bg="secondary" className="" >
                          {title}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

              

                {fields.description && <p className="text-muted">{fields.description}</p>}
              </div>
            </div>
          );
        });

        setVideoItems(mapped);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <MediaHero
        imageSrc={heroImage}
        overlayContent={<h1 className="text-uppercase">Video</h1>}
        height="half"
        photoOnly
        wireblock={wireblock}
        textColor="#fff"
      />

      {/* Video Grid */}
      <section className="grid-mt-n5 mb-5">
        <Grid items={videoItems} className="position-relative z-3" columns={{ xs: 12, md: 6, lg: 6 }} />
      </section>

      <Testimonials variant="carousel" />

      <CallToAction
        heading="Lights, Camera... You!"
        subheading="Let us capture your most memorable moments with cinematic quality and storytelling flair."
        bgColor="#2b2b2b"
        textColor="#fff"
        buttonText="Get Started"
        buttonLink="/contact"
      />

      <RandomContentfulInstagramFeed instagramUrl="https://www.instagram.com/ts_filmphoto" />
    </>
  );
}

import { useEffect, useState, useRef, JSX } from "react";
import client from "../contentfulClient";
import { MediaItem } from "../types/contentful"; 
import RandomContentfulInstagramFeed from "../components/RandomContentfulInstagramFeed";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import MediaHero from "../components/MediaHero";
import heroImage from "../assets/media/ts-logo-bg.jpg";
import wireblock from "../assets/media/wireblocks/photo-wireblock.svg";
import Badge from "react-bootstrap/Badge";
import { FaMapMarkerAlt } from "react-icons/fa";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function PhotoPage2() {
  const [photoItems, setPhotoItems] = useState<JSX.Element[]>([]);
  const [allItems, setAllItems] = useState<JSX.Element[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch Contentful items
  useEffect(() => {
    client
      .getEntries({ content_type: "mediaItem", include: 2 })
      .then((response) => {
        const genreSet = new Set<string>();

        const mapped = response.items
          .filter((item: any) => item.fields.category === "Photo")
          .map((item: any) => {
            const fields: MediaItem["fields"] = item.fields;
            const photo = fields.photo;
            const itemGenres = Array.isArray(fields.genre) ? fields.genre : [];

            itemGenres.forEach((g) => {
              const genreTitle = (g?.fields as any)?.name ?? g?.fields?.title;
              if (genreTitle) genreSet.add(genreTitle);
            });

            if (!photo?.fields?.file?.url) return null;
            const mediaUrl = `https:${photo.fields.file.url}`;

            return (
              <div
                key={item.sys.id}
                className="masonry-item fade-observe rounded shadow-sm overflow-hidden"
                data-genres={itemGenres
                  .map((g) => ((g?.fields as any)?.name ?? g?.fields?.title))
                  .join(",")}
              >
                <img src={mediaUrl} alt={fields.title} loading="lazy" />

                <div className="overlay absolute bottom-0 left-0 w-100 bg-[#1a1a1a]/60 text-white p-3 translate-y-full transition-transform duration-300 d-flex flex-column justify-content-end">
                  <div className="d-flex justify-content-between align-items-center mb-1 gap-1">
                    {fields.description && (
                      <p className="mb-0 xx-small text-light">{fields.description}</p>
                    )}
                    {fields.location && (
                      <div className="d-flex align-items-center text-muted small">
                        <FaMapMarkerAlt className="me-1 text-light xx-small" />
                        <span className="text-truncate text-light xx-small mb-0">
                          {fields.location}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-0">
                    {itemGenres.map((genre: any, gIdx: number) => {
                      const title = ((genre?.fields as any)?.name ?? genre?.fields?.title) ?? "Unknown Genre";
                      return (
                        <Badge key={gIdx} bg="secondary" className="me-1">
                          {title}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
          .filter(Boolean) as JSX.Element[];

        setAllItems(shuffle(mapped));
        setPhotoItems(shuffle(mapped));
        setGenres(Array.from(genreSet));
      })
      .catch(console.error);
  }, []);

  // Filter items by selected genres
  useEffect(() => {
    if (selectedGenres.size === 0) {
      setPhotoItems(allItems);
    } else {
      const filtered = allItems.filter((el) => {
        const itemGenres = el.props["data-genres"] as string;
        const itemGenreList = itemGenres.split(",");
        return [...selectedGenres].some((g) => itemGenreList.includes(g));
      });
      setPhotoItems(filtered);
    }
  }, [selectedGenres, allItems]);

  // Fade in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = containerRef.current?.querySelectorAll(".fade-observe");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [photoItems]);

  return (
    <>
      <MediaHero
  imageSrc={heroImage}
  overlayContent={
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-uppercase mb-3">Photo</h1>
      <select
        id="genre-filter"
        value={selectedGenres.size > 0 ? Array.from(selectedGenres)[0] : "Show All"}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedGenres(value === "Show All" ? new Set() : new Set([value]));
        }}
        className="form-select w-auto cursor-pointer shadow-lg"
      >
        <option value="Show All">Show All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  }
  height="half"
  photoOnly
  wireblock={wireblock}
  textColor="#fff"
/>


      <div className="container mb-5 position-relative z-3 grid-mt-n5" ref={containerRef}>
        <section className="masonry-grid">{photoItems}</section>
      </div>

      <Testimonials variant="carousel" className="bg-light-100" />
      <CallToAction
        heading="Like what you see?"
        subheading="Give us a shout and let's create something beautiful together."
        bgColor="#2b2b2b"
        textColor="#fff"
        buttonText="Get in Touch"
        buttonLink="/contact"
      />
      <RandomContentfulInstagramFeed instagramUrl="https://www.instagram.com/ts_filmphoto" />
    </>
  );
}

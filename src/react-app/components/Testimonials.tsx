import { useEffect, useState } from "react";
import client from "../contentfulClient";
import { Testimonial } from "../types/contentful";
import { Carousel, Image } from "react-bootstrap";
import "./Testimonials.css";

interface TestimonialsProps {
  variant?: "carousel" | "list";
  bgColor?: string;          // e.g., "bg-light", "bg-white", "#f8f9fa"
  filterIds?: string[];      // only show testimonials with these sys.ids
  className?: string; 
 
}

const Testimonials: React.FC<TestimonialsProps> = ({
  variant = "list",
  bgColor = "bg-light",
  filterIds,
  className = "",
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    client
      .getEntries<{ fields: Testimonial["fields"]; contentTypeId: string }>({ content_type: "testimonial" })
      .then((response) => {
        let items = response.items.map((item) => ({
          sys: item.sys,
          fields: item.fields,
        })) as Testimonial[];

        if (filterIds && filterIds.length) {
          items = items.filter((t) => filterIds.includes(t.sys.id));
        }

        setTestimonials(items);
      })
      .catch(console.error);
  }, [filterIds]);

  if (!testimonials.length) return null;

  // Determine inline style vs background class
  const sectionStyle = typeof bgColor === "string" && bgColor.startsWith("#") ? { backgroundColor: bgColor } : undefined;
  const sectionClassName = typeof bgColor === "string" && !bgColor.startsWith("#") ? bgColor : "";

  const combinedClassName = `${sectionClassName} ${className} p-5 text-center`.trim();

  if (variant === "carousel") {
    return (
      <section className={combinedClassName} style={sectionStyle}>
        <div className="container">
          <Carousel controls indicators={false} interval={5000} pause="hover">
            {testimonials.map((t) => {
              const imgUrl = t.fields.image ? `https:${t.fields.image.fields.file.url}` : undefined;
              return (
                <Carousel.Item key={t.sys.id}>
                  <div className="carousel-content">
                    {imgUrl && (
                      <Image
                        src={imgUrl}
                        roundedCircle
                        className="mb-3"
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                      />
                    )}
                    <blockquote className="blockquote">
                      <h3 className="mb-2">"{t.fields.quoteSnippet}"</h3>
                      <p className="mb-3">"{t.fields.longQuote}"</p>
                      <footer className="blockquote-footer mt-4 signature client-name">{t.fields.personName}</footer>
                    </blockquote>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </section>
    );
  }

  // List variation
  return (
    <section className={combinedClassName} style={sectionStyle}>
      <div className="container">
        {testimonials.map((t) => {
          const imgUrl = t.fields.image ? `https:${t.fields.image.fields.file.url}` : undefined;
          return (
            <blockquote key={t.sys.id} className="blockquote mb-4">
              {imgUrl && (
                <Image
                  src={imgUrl}
                  roundedCircle
                  className="mb-3"
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
              )}
              <p className="mb-2">"{t.fields.quoteSnippet}"</p>
              <footer className="blockquote-footer">{t.fields.personName}</footer>
            </blockquote>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;

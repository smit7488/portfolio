import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../animations/motionVariants";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

interface OtherProject {
  name: string;
  slug: string;
  category: string;
  dateCompleted?: string;
  summary?: string;
  mainProjectThumbnail?: { file: { url: string } };
}

const MotionCol = motion.create(Col);

export default function OtherProjects({ excludeSlug }: { excludeSlug: string }) {
  const [projects, setProjects] = useState<OtherProject[]>([]);
  const [allProjects, setAllProjects] = useState<OtherProject[]>([]);

  useEffect(() => {
    async function fetchAllProjects() {
      try {
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=projectDetails&select=fields.name,fields.slug,fields.category,fields.dateCompleted,fields.summary,fields.mainProjectThumbnail&include=1&limit=100` // Increased limit to get all projects
        );
        const data = await res.json();

        const mappedProjects: OtherProject[] = data.items.map((item: any) => {
          const thumbAsset = data.includes?.Asset?.find(
            (asset: any) => asset.sys.id === item.fields.mainProjectThumbnail?.sys?.id
          );

          return {
            name: item.fields.name,
            slug: item.fields.slug,
            category: item.fields.category,
            dateCompleted: item.fields.dateCompleted,
            summary: item.fields.summary,
            mainProjectThumbnail: thumbAsset?.fields,
          };
        });

        setAllProjects(mappedProjects);
      } catch (err) {
        console.error("Error fetching other projects:", err);
      }
    }

    fetchAllProjects();
  }, []); // Empty dependency array - fetch once when component mounts

  // Filter projects whenever excludeSlug changes
  useEffect(() => {
    const filteredProjects = allProjects
      .filter(proj => proj.slug !== excludeSlug)
      .slice(0, 6); // Always show 6 projects
    
    setProjects(filteredProjects);
  }, [allProjects, excludeSlug]); // Re-run when allProjects or excludeSlug changes

  if (projects.length === 0) return null;

  return (
    <div className="mt-5">
      <h3 className="mb-4">Other projects I've worked on...</h3>

      {/* Staggered container */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        key={projects.map(p => p.slug).join('-')} // Force re-animation when projects change
      >
        <Row className="g-4">
          {projects.map((proj) => (
            <MotionCol
              key={proj.slug}
              md={4}
              sm={6}
              variants={staggerItem}
            >
              <Card className="h-100 shadow-sm border-0 p-3">
                {proj.mainProjectThumbnail?.file?.url && (
                  <Link to={`/project/${proj.slug}`}>
                    <div className="image-wrapper-3x2 rounded-1 shadow-sm">
                      <img
                        src={`https:${proj.mainProjectThumbnail.file.url}`}
                        alt={proj.name}
                        className="img-fluid object-fit-cover w-100 h-100"
                      />
                    </div>
                  </Link>
                )}

                <Card.Body className="mb-4 p-0 pt-3">
                  <Card.Title>
                    <h5>{proj.name}</h5>
                  </Card.Title>

                  <div className="d-flex justify-content-start align-items-center mb-3 flex-wrap">
                    <span className="badge outline-muted me-2 xx-small rounded-1">
                      {proj.category} Project
                    </span>
                    {proj.dateCompleted && (
                      <p className="text-muted small mb-0">
                        <strong>{new Date(proj.dateCompleted).getFullYear()}</strong>
                      </p>
                    )}
                  </div>

                  {proj.summary && (
                    <div className="small text-muted mb-3">{proj.summary}</div>
                  )}

                  <p className="text-end mb-0 mt-5 small position-absolute view-project-link">
                    <Link
                      to={`/project/${proj.slug}`}
                      className="text-decoration-none"
                    >
                      View Project &rarr;
                    </Link>
                  </p>
                </Card.Body>
              </Card>
            </MotionCol>
          ))}
        </Row>
      </motion.div>
    </div>
  );
}
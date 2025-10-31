import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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

export default function OtherProjects({ excludeSlug }: { excludeSlug: string }) {
  const [projects, setProjects] = useState<OtherProject[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=projectDetails&select=fields.name,fields.slug,fields.category,fields.dateCompleted,fields.summary,fields.mainProjectThumbnail&include=1&limit=6`
        );
        const data = await res.json();

        const mappedProjects: OtherProject[] = data.items
          .filter((item: any) => item.fields.slug !== excludeSlug)
          .map((item: any) => {
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

        setProjects(mappedProjects);
      } catch (err) {
        console.error("Error fetching other projects:", err);
      }
    }

    fetchProjects();
  }, [excludeSlug]);

  if (projects.length === 0) return null;

  return (
    <div className="mt-5">
      <h3 className="mb-4">Other projects I've worked on...</h3>
      <Row className="g-4">
        {projects.map((proj) => (
          <Col md={4} sm={6} key={proj.slug}>
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
                <Card.Title><h5>{proj.name}</h5></Card.Title>
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
                  <div className="small text-muted mb-3">
                    {proj.summary}
                  </div>
                )}



                <p className="text-end mb-0 mt-5 small position-absolute view-project-link">
                  <Link to={`/project/${proj.slug}`} className="text-decoration-none">
                    View Project &rarr;
                  </Link>
                </p>


              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

interface OtherProject {
  name: string;
  slug: string;
  category: string;
  dateCompleted?: string;
  projectSummary?: any;
  mainProjectThumbnail?: { file: { url: string } };
}

export default function OtherProjects({ excludeSlug }: { excludeSlug: string }) {
  const [projects, setProjects] = useState<OtherProject[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=projectDetails&select=fields.name,fields.slug,fields.category,fields.dateCompleted,fields.projectSummary,fields.mainProjectThumbnail&include=1`
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
              projectSummary: item.fields.projectSummary,
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
      <h3 className="mb-4">Other Projects</h3>
      <Row className="g-4">
        {projects.map((proj) => (
          <Col md={4} sm={6} key={proj.slug}>
            <Card className="h-100 shadow-sm border-0">
              {proj.mainProjectThumbnail?.file?.url && (
                <Card.Img
                  variant="top"
                  src={`https:${proj.mainProjectThumbnail.file.url}`}
                  alt={proj.name}
                  className="img-fluid rounded-top"
                />
              )}

              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge outline-muted me-2 xx-small">
                    {proj.category} Project
                  </span>
                  {proj.dateCompleted && (
                    <small className="text-muted">
                      <strong>{new Date(proj.dateCompleted).getFullYear()}</strong>
                    </small>
                  )}
                </div>

                <Card.Title>{proj.name}</Card.Title>

                {proj.projectSummary && (
                  <div className="small text-muted mb-3">
                    {documentToReactComponents(proj.projectSummary)}
                  </div>
                )}

                <Link to={`/projects/${proj.slug}`}>
                  <Button variant="outline-dark" size="sm">
                    View Project
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

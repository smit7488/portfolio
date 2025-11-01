import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

import MediaHero from "../components/MediaHero";
import trevorHeadshot from "../assets/media/trevor-headshot.avif";
import WaveGradientBackground from "../components/WaveGradientBackground";
import ContactForm from "../components/ContactForm";
import OtherProjects from "../components/OtherProjects";
import CallToAction from "../components/CallToAction";
import { fadeIn } from "../animations/motionVariants";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

interface Project {
  name: string;
  slug: string;
  dateCompleted?: string;
  category: string;
  subcategory?: string;
  projectDetails?: any;
  mainProjectImage?: { file: any; fields: { file: { url: string } } };
  multiProjectImage?: { file: any; fields: { file: { url: string } } }[];
  liveUrl?: string;
  githubUrl?: string;
  embeddedLink?: string;
  technologies: string[];
  includes?: any;
}

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=projectDetails&fields.slug=${slug}&include=2`
        );
        const data = await res.json();

        if (data.items.length > 0) {
          const entry = data.items[0];

          const imageAsset = data.includes?.Asset?.find(
            (asset: any) => asset.sys.id === entry.fields.mainProjectImage?.sys?.id
          );

          setProject({
            name: entry.fields.name,
            slug: entry.fields.slug,
            dateCompleted: entry.fields.dateCompleted,
            category: entry.fields.category,
            subcategory: entry.fields.subcategory,
            projectDetails: entry.fields.projectDetails,
            mainProjectImage: imageAsset?.fields,
            multiProjectImage: (entry.fields.multiProjectImage || []).map(
              (imgLink: any) => {
                const asset = data.includes?.Asset?.find(
                  (asset: any) => asset.sys.id === imgLink.sys.id
                );
                return asset?.fields;
              }
            ),
            liveUrl: entry.fields.liveUrl,
            githubUrl: entry.fields.githubUrl,
            embeddedLink: entry.fields.embeddedLink,
            technologies: entry.fields.technologies || [],
            includes: data.includes || {},
          });
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    const links = document.querySelectorAll(".project-description a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [project]);

  if (!project) return <div className="text-center py-5">Loading…</div>;

  // ✅ Render options that resolve embedded assets properly
  const renderOptions = (includes: any) => ({
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node?.data?.target?.sys?.id;
        const asset = includes?.Asset?.find((a: any) => a.sys.id === assetId);
        const file = asset?.fields?.file;

        if (!file?.url) {
          console.warn("Missing embedded asset:", node);
          return null;
        }

        return (
          <div className="my-4 text-center">
            <img
              src={`https:${file.url}`}
              alt={asset.fields?.title || "Embedded image"}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        );
      },

      [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => {
        const url = node.data.target.fields.file.url;
        return (
          <a
            href={`https:${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-underline"
          >
            {children}
          </a>
        );
      },
    },
  });

  return (
    <>
      {/* Hero Section */}
      <MediaHero
        overlayContent={
          <Container className="my-5">
            <p className="text-light mb-0 mt-5">
              <Link to="/#projects" className="text-light text-decoration-none">
                &larr; Back to Projects
              </Link>
            </p>
          </Container>
        }
        background={<WaveGradientBackground />}
        minHeightOnly={true}
      />

      {/* Project Details */}
      <Container className="pb-5">
        <div className="shadow rounded p-4 grid-mt-n5 z-5 position-relative bg-white">
          <Row className="gy-5 gx-4">
            <Col lg={8} sm={12}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <Row className="gy-3 gx-1">
                  <Col lg={8} sm={12}>
                    <h1 className="text-start mb-2 project-name">{project.name}</h1>
                    <div className="d-flex gap-1">
                      <span className="badge outline-muted me-2 xx-small">
                        {project.category} Project
                      </span>
                      {project.dateCompleted && (
                        <small>
                          <strong>
                            {new Date(project.dateCompleted).getFullYear()}
                          </strong>
                        </small>
                      )}
                    </div>
                  </Col>

                  <Col lg={4} sm={12}>
                    <div className="d-flex gap-3 justify-content-lg-end flex-wrap">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark text-nowrap d-flex align-items-center gap-2"
                        >
                          <FaGithub size={18} />
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <Button
                          className="custom-btn-gradient text-nowrap d-flex align-items-center gap-2"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Site
                          <FaArrowUpRightFromSquare size={14} />
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>

                <hr />

                {project.technologies.length > 0 && (
                  <div className="mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="badge bg-dark me-2 xx-small rounded-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <img
                  src={
                    project.mainProjectImage
                      ? `https:${project.mainProjectImage.file.url}`
                      : trevorHeadshot
                  }
                  alt={project.name}
                  className="img-fluid rounded shadow-sm mb-4"
                />

                {project.projectDetails && (
                  <div className="project-description mb-4">
                    {documentToReactComponents(
                      project.projectDetails,
                      renderOptions(project.includes)
                    )}
                  </div>
                )}

                {project.multiProjectImage &&
                  project.multiProjectImage.length > 0 && (
                    <Carousel className="mb-4">
                      {project.multiProjectImage.map((img, idx) => (
                        <Carousel.Item key={idx}>
                          <img
                            className="d-block w-100 rounded shadow-sm"
                            src={`https:${img.file.url}`}
                            alt={`${project.name} image ${idx + 1}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  )}


                    <div className="d-flex gap-3 flex-wrap">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark text-nowrap d-flex align-items-center gap-2"
                        >
                          <FaGithub size={18} />
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <Button
                          className="custom-btn-gradient text-nowrap d-flex align-items-center gap-2"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Site
                          <FaArrowUpRightFromSquare size={14} />
                        </Button>
                      )}
                    </div>
                 

              </motion.div>
              
            </Col>

            <Col lg={4} sm={12}>
              <ContactForm />
            </Col>
          </Row>
          <Row>


          </Row>
        </div>
      </Container>

      <Container className="pb-5">
        <OtherProjects excludeSlug={project.slug} />
      </Container>

      <CallToAction
        heading="Have a Project You Need Help With?"
        bgColor="var(--color-dark-bg)"
        textColor="white"
        buttonText="Get in Touch"
        buttonLink="/contact"
        className="border-top shadow-sm z-2"
        useWaveGradient={true}
        containerClassName=""
        hasContainer={false}
      />
    </>
  );
}

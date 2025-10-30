import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Container, Row, Col, Button } from "react-bootstrap";
import MediaHero from "../components/MediaHero";
import trevorHeadshot from "../assets/media/trevor-headshot.avif";
import WaveGradientBackground from "../components/WaveGradientBackground";
import ContactForm from "../components/ContactForm";
import { FaGithub } from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

interface Project {
    name: string;
    slug: string;
    dateCompleted?: string;
    category: string;
    subcategory?: string;
    projectDetails?: any;
    mainProjectImage?: {
        file: any; fields: { file: { url: string } }
    };
    liveLink?: string;
    githubLink?: string;
    embeddedLink?: string;
    technologies: string[];
}

export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=projectDetails&fields.slug=${slug}&include=1`
                );
                const data = await res.json();
                if (data.items.length > 0) {
                    const entry = data.items[0];

                    // Map linked asset for mainProjectImage
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
                        liveLink: entry.fields.liveLink,
                        githubLink: entry.fields.githubLink,
                        embeddedLink: entry.fields.embeddedLink,
                        technologies: entry.fields.technologies || [],
                    });
                }
            } catch (err) {
                console.error("Error fetching project:", err);
            }
        }
        fetchData();
    }, [slug]);

    if (!project) return <div className="text-center py-5">Loading…</div>;

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
                        <Col lg={8} sm={6}>

                            <Row className="gy-3 gx-1 ">
                                <Col lg={8} sm={12}>
                                    <h1 className="text-start mb-2">{project.name}</h1>
                                    <div className="d-flex gap-1 ">

                                        <span className="badge outline-muted me-2 xx-small">{project.category} Project</span>
                                        {project.dateCompleted && (
                                            <small><strong>{new Date(project.dateCompleted).getFullYear()}</strong></small>
                                        )}
                                    </div>
                                </Col>

                                <Col lg={4} sm={12}>
                                    <div className="d-flex gap-3 justify-content-lg-end">
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-dark text-nowrap d-flex align-items-center gap-2"
                                            >
                                                <FaGithub size={18} />
                                                GitHub
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <Button
                                                className="custom-btn-gradient text-nowrap d-flex align-items-center gap-2"
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Site
                                                <FaArrowUpRightFromSquare size={14} />
                                            </Button>
                                        )}
                                        {project.embeddedLink && (
                                            <a href={project.embeddedLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                                Embedded
                                            </a>
                                        )}
                                    </div>
                                </Col>

                            </Row>





                            <hr></hr>
                            <div className="mb-4">
                                {project.technologies.length > 0 && (
                                    <div className="">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="badge bg-dark me-2 xx-small">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                            </div>

                            <img
                                src={project.mainProjectImage ? `https:${project.mainProjectImage.file.url}` : trevorHeadshot}
                                alt={project.name}
                                className="img-fluid rounded shadow-sm mb-4"
                            />

                            {project.projectDetails && (
                                <div className="project-description mb-4">
                                    {documentToReactComponents(project.projectDetails)}
                                </div>
                            )}


                            <div className="d-flex gap-3">
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-dark text-nowrap d-flex align-items-center gap-2"
                                    >
                                        <FaGithub size={18} />
                                        GitHub
                                    </a>
                                )}
                                {project.liveLink && (
                                    <Button
                                        className="custom-btn-gradient text-nowrap d-flex align-items-center gap-2"
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Site
                                        <FaArrowUpRightFromSquare size={14} />
                                    </Button>
                                )}
                                {project.embeddedLink && (
                                    <a href={project.embeddedLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        Embedded
                                    </a>
                                )}
                            </div>



                        </Col>
                        <Col lg={4} sm={6}>
                            <ContactForm />
                        </Col>
                    </Row>

                </div>
            </Container>
        </>
    );
}

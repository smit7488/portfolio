import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProjectsGrid.css";

interface Asset {
  fields: {
    file: { url: string };
    title?: string;
  };
}

interface Project {
  sys: { id: string };
  fields: {
    name: string;
    category: string;
    slug: string; // add slug for routing
    gridThumbnail?: Asset;
  };
}

interface ProjectsGridProps {
  category: "Web" | "Creative";
}

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ category }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=projectDetails&include=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        const data = await res.json();

        const assetsMap = new Map(
          data.includes?.Asset?.map((asset: any) => [asset.sys.id, asset]) || []
        );

        // Filter projects by the selected category
        const filtered = data.items.filter(
          (item: any) => item.fields.category === category
        );

        const withImages = filtered.map((item: any) => {
          const gridImageId = item.fields.gridThumbnail?.sys?.id;
          const image = gridImageId ? assetsMap.get(gridImageId) : null;
          return {
            ...item,
            fields: {
              ...item.fields,
              gridThumbnail: image,
              slug: item.fields.slug || item.fields.name.toLowerCase().replace(/\s+/g, "-"), // fallback slug
            },
          };
        });

        setProjects(withImages);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  const gridItems = projects.map((project) => {
    const imgUrl = project.fields.gridThumbnail?.fields.file.url;
    const title = project.fields.name;
    const slug = project.fields.slug;

    return (
      <Link key={project.sys.id} to={`/project/${slug}`} className="text-decoration-none">
        <div className="project-tile rounded position-relative shadow overflow-hidden">
          {imgUrl && (
            <img
              src={`https:${imgUrl}`}
              alt={title}
              className="img-fluid"
            />
          )}
          <Badge
            bg="white"
            className="position-absolute top-0 start-0 m-2 px-3 py-2 xx-small rounded-1 text-dark shadow-sm"
          >
            {title}
          </Badge>
        </div>
      </Link>
    );
  });

  return <div className="my-5"><Grid items={gridItems} /></div>;
};

export default ProjectsGrid;

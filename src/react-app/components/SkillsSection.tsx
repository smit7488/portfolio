import { Container, Row, Col, Card } from "react-bootstrap";
import { DiVisualstudio } from "react-icons/di";
import {FaHtml5,FaCss3Alt, FaReact, FaBootstrap, FaPhp, FaWordpress, FaFigma, FaWindowMaximize, FaGoogle} from "react-icons/fa";
import { SiAngular, SiTailwindcss, SiVite, SiJavascript, SiAdobephotoshop, SiAdobeillustrator, SiPostman, SiDotnet, SiAdobeaftereffects, SiWebflow, SiSvg, SiTypescript, SiSitecore, SiCanva, SiCloudflare } from "react-icons/si";

const iconSize = 22;

export default function SkillsSection() {
  const frontEndSkills = [
    { icon: <FaReact color="#61DAFB" size={iconSize} />, label: "React" },
    { icon: <SiAngular color="#DD0031" size={iconSize} />, label: "Angular" },
    { icon: <FaHtml5 color="#E34F26" size={iconSize} />, label: "HTML5" },
    { icon: <FaCss3Alt color="#1572B6" size={iconSize} />, label: "CSS3" },
    { icon: <SiJavascript color="#F7DF1E" size={iconSize} />, label: "JavaScript" },
    { icon: <SiTypescript color="#3078C6" size={iconSize} />, label: "TypeScript" },
    { icon: <FaBootstrap color="#7952B3" size={iconSize} />, label: "Bootstrap" },
    { icon: <SiTailwindcss color="#38B2AC" size={iconSize} />, label: "Tailwind CSS" },
  ];

  const techAndTools = [
    { icon: <SiSitecore color="#EB1F1F" size={iconSize} />, label: "Sitecore" },
    { icon: <SiDotnet color="#5C2D91" size={iconSize} />, label: "ASP.NET"},
    { icon: <SiVite color="#646CFF" size={iconSize} />, label: "Vite" },
    { icon: <FaPhp color="#777BB4" size={iconSize} />, label: "PHP" },
    { icon: <SiPostman color="#FF6C37" size={iconSize} />, label: "Postman" },
    { icon: <FaGoogle color="#4285F4" size={iconSize} />, label: "Google Analytics" },
    { icon: <SiCloudflare color="#F38020" size={iconSize} />, label: "Cloudflare" },
    { icon: <FaWordpress color="#21759B" size={iconSize} />, label: "WordPress" },
  ];

  const toolsSkills = [
    { icon: <SiAdobephotoshop color="#31A8FF" size={iconSize} />, label: "Photoshop" },
    { icon: <SiAdobeillustrator color="#FF9A00" size={iconSize} />, label: "Illustrator" },
    { icon: <FaFigma color="#F24E1E" size={iconSize} />, label: "Figma" },
    { icon: <SiWebflow color="#146EF5" size={iconSize} />, label: "Webflow" },
    { icon: <SiSvg color="#FFB13B" size={iconSize} />, label: "SVGator" },
    { icon: <FaWindowMaximize color="#FF6600" size={iconSize} />, label: "Instapage" },
    { icon: <SiAdobeaftereffects color="#9999FF" size={iconSize} />, label: "After Effects" },
    { icon: <SiCanva color="#00C4CC" size={iconSize} />, label: "Canva" },
  ];

  const skillSections = [
    { title: "Frontend Technologies", skills: frontEndSkills },
    { title: "Backend & Web Tools", skills: techAndTools },
    { title: "Design Tools", skills: toolsSkills },
  ];

  return (
    <section className="py-5 bg-light-200">
      <Container>
        <h2 className="text-center mb-3 fw-bold text-4xl">Skills & Tools</h2>
        <p className="text-center mb-5">
          A full suite of modern tools I use to design and deliver scalable, efficient solutions.</p>
        <Row className="gy-4">
          {skillSections.map((section, idx) => (
            <Col key={idx} md={6} lg={4}>
              <Card className="p-4 shadow-sm h-100 border-0 bg-light-100">
                <h5 className="fw-bold mb-4 text-center">{section.title}</h5>
                <Row xs={2} sm={4} md={2} className="g-3 text-center">
                  {section.skills.map((skill, sIdx) => (
                    <Col key={sIdx}>
                      <Card className="h-100 border-0 d-flex flex-column align-items-center justify-content-center shadow-sm p-3">
                        <div className="d-flex flex-column align-items-center">
                          {skill.icon}
                          <span className="mt-2 small fw-semibold">{skill.label}</span>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

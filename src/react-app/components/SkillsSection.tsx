import { Container, Row, Col, Card } from "react-bootstrap";
import { DiVisualstudio } from "react-icons/di";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaBootstrap,
  FaPhp,
  FaWordpress,
  FaFigma,
  FaGoogle,
} from "react-icons/fa";
import {
  SiAdobe,
  SiNextdotjs,
  SiTailwindcss,
  SiMarketo,
  SiSitecore,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiWebflow,
  SiSvg,
} from "react-icons/si";

const iconSize = 22;

export default function SkillsSection() {
  const frontEndSkills = [
    { icon: <FaHtml5 color="#E34F26" size={iconSize} />, label: "HTML" },
    { icon: <FaCss3Alt color="#1572B6" size={iconSize} />, label: "CSS" },
    { icon: <FaJs color="#F7DF1E" size={iconSize} />, label: "JavaScript" },
    { icon: <FaReact color="#61DAFB" size={iconSize} />, label: "React" },
    { icon: <SiNextdotjs color="#000" size={iconSize} />, label: "Next.js" },
    { icon: <SiTailwindcss color="#38B2AC" size={iconSize} />, label: "Tailwind CSS" },
    { icon: <FaBootstrap color="#7952B3" size={iconSize} />, label: "Bootstrap" },
  ];

  const backEndCmsSkills = [
    { icon: <FaNodeJs color="#68A063" size={iconSize} />, label: "Node.js" },
    { icon: <FaPhp color="#777BB4" size={iconSize} />, label: "PHP" },
    { icon: <DiVisualstudio color="#5C2D91" size={iconSize} />, label: "ASP.NET / Visual Studio" },
    { icon: <SiSitecore color="#EB1F1F" size={iconSize} />, label: "Sitecore" },
    { icon: <FaWordpress color="#21759B" size={iconSize} />, label: "WordPress" },
    { icon: <SiWebflow color="#146EF5" size={iconSize} />, label: "Webflow" },
    { icon: <SiMarketo color="#7F3F98" size={iconSize} />, label: "Marketo" },
  ];

  const designSkills = [
    { icon: <SiAdobe color="#FF0000" size={iconSize} />, label: "Adobe Suite" },
    { icon: <SiAdobephotoshop color="#31A8FF" size={iconSize} />, label: "Photoshop" },
    { icon: <SiAdobeillustrator color="#FF9A00" size={iconSize} />, label: "Illustrator" },
    { icon: <FaFigma color="#F24E1E" size={iconSize} />, label: "Figma" },
    { icon: <SiSvg color="#FFB13B" size={iconSize} />, label: "SVGator" },
  ];

  const otherSkills = [
    { icon: <FaGitAlt color="#F05032" size={iconSize} />, label: "Git" },
    { icon: <FaGoogle color="#4285F4" size={iconSize} />, label: "SEO Principles" },
    { icon: <FaGoogle color="#4285F4" size={iconSize} />, label: "Google Analytics" },
  ];

  const skillSections = [
    { title: "Front-End & Web Development", skills: frontEndSkills },
    { title: "Back-End & CMS", skills: backEndCmsSkills },
    { title: "Design Tools", skills: designSkills },
    { title: "Utilities", skills: otherSkills },
  ];

  return (
    <section className="py-5 bg-light-200">
      <Container>
        <h2 className="text-center mb-5 fw-bold">Skills & Tools</h2>
        <Row className="gy-4">
          {skillSections.map((section, idx) => (
            <Col key={idx} md={6}>
              <Card className="p-4 shadow-sm h-100 border-0">
                <h5 className="fw-bold mb-4 text-center">{section.title}</h5>
                <Row xs={2} sm={2} md={3} className="g-3 text-center">
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

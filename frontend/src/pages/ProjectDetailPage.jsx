import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ProjectHero from "../components/ProjectHero";
import ProjectDetails from "../components/ProjectDetails";
import Footer from "../components/Footer";
const ProjectDetailPage = () => {
  const { slug } = useParams();

  return (
    <>
      <Header />

      <ProjectHero projectSlug={slug} />

      <ProjectDetails projectSlug={slug} />
      <Footer />
    </>
  );
};

export default ProjectDetailPage;
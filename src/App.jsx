import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectModal from "./components/ProjectModal";
import ContactModal from "./components/ContactModal";
import AboutModal from "./components/AboutModal";
import "./styles/responsive.css";

function App() {
  const timers = useRef([]);

  const [morph, setMorph] = useState(false);
  const [expand, setExpand] = useState(false);
  const [hideEdges, setHideEdges] = useState(false);
  const [showBrainConnections, setShowBrainConnections] = useState(false);
  const [showProjectClusters, setShowProjectClusters] = useState(false);

  const [showSkillClusters, setShowSkillClusters] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const [showAboutModal, setShowAboutModal] = useState(false);

  const controlsRef = useRef();

  const handleAboutClick = () => setShowAboutModal(true);

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const clearAllTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const handleHomeClick = () => {
    clearAllTimers();

    setMorph(false);
    setExpand(false);

    setHideEdges(false);
    setShowBrainConnections(false);

    setShowProjectClusters(false);

    setShowSkillClusters(false);
    setShowExplosion(false);

    setSelectedProject(null);
    setShowContactModal(false);
  };

  const handleSkillsClick = () => {
    clearAllTimers();

    if (showSkillClusters) return;

    handleHomeClick();

    controlsRef.current?.reset();

    timers.current.push(
      setTimeout(() => {
        setExpand(true);
      }, 500)
    );

    timers.current.push(
      setTimeout(() => {
        setShowExplosion(true);
      }, 1200)
    );

    timers.current.push(
      setTimeout(() => {
        setShowSkillClusters(true);
      }, 2500)
    );
  };

  const handleProjectsClick = () => {
    if (showProjectClusters) return;

    handleHomeClick();

    setHideEdges(true);

    timers.current.push(
      setTimeout(() => {
        setMorph(true);
      }, 700)
    );

    timers.current.push(
      setTimeout(() => {
        setShowBrainConnections(true);
      }, 2500)
    );

    timers.current.push(
      setTimeout(() => {
        setHideEdges(false);
      }, 2500)
    );

    timers.current.push(
      setTimeout(() => {
        setExpand(true);
      }, 3500)
    );

    timers.current.push(
      setTimeout(() => {
        setShowProjectClusters(true);
      }, 4200)
    );
  };

  useEffect(() => {
    if (showSkillClusters) {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "hidden";
    };
  }, [showSkillClusters]);

  return (
    <>
      <Navbar
        onProjectsClick={handleProjectsClick}
        onHomeClick={handleHomeClick}
        onContactClick={handleContactClick}
        onSkillsClick={handleSkillsClick}
        onAboutClick={handleAboutClick}
      />

      <Hero
        morph={morph}
        expand={expand}
        onProjectsClick={handleProjectsClick}
        showBrainConnections={showBrainConnections}
        hideEdges={hideEdges}
        showProjectClusters={showProjectClusters}
        showSkillClusters={showSkillClusters}
        showExplosion={showExplosion}
        setSelectedProject={setSelectedProject}
        controlsRef={controlsRef}
      />

      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default App;
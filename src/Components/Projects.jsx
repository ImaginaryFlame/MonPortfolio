import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import '../styles/projects.css';

import { useRef, useEffect, useState } from 'react';

const Projects = () => {
  const pillsRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const updateIndicator = (element) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const parentRect = pillsRef.current.getBoundingClientRect();
    
    setIndicatorStyle({
      width: `${rect.width}px`,
      transform: `translateX(${rect.left - parentRect.left}px)`,
    });
  };

  useEffect(() => {
    // Initialiser l'indicateur sur le premier onglet
    const firstTab = pillsRef.current?.querySelector('.nav-link');
    if (firstTab) {
      updateIndicator(firstTab);
    }

    // Observer les changements de taille de fenêtre
    const handleResize = () => {
      const activeTab = pillsRef.current?.querySelector('.nav-link.active');
      if (activeTab) {
        updateIndicator(activeTab);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (key) => {
    const selectedTab = pillsRef.current?.querySelector(`[data-rb-event-key="${key}"]`);
    if (selectedTab) {
      updateIndicator(selectedTab);
    }
  };

  const projects = {
    "arts": [
      {
        title: "La Légende de la Pomme Imaginaire",
        description: "Une histoire interactive mêlant art numérique et narration",
        imgUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1074&auto=format&fit=crop",
      },
      {
        title: "Character Design - Héros",
        description: "Série de designs de personnages pour un projet de jeu vidéo",
        imgUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1026&auto=format&fit=crop",
      },
      {
        title: "Concept Art 'Univers'",
        description: "Exploration visuelle d'univers science-fiction",
        imgUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1127&auto=format&fit=crop",
      }
    ],
    "dev": [
      {
        title: "Portfolio React + Tailwind",
        description: "Site portfolio moderne et responsive",
        imgUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1055&auto=format&fit=crop",
      },
      {
        title: "API Talents",
        description: "API REST pour la gestion de talents",
        imgUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1170&auto=format&fit=crop",
      },
      {
        title: "Game Prototyper",
        description: "Outil de prototypage rapide de jeux",
        imgUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=1074&auto=format&fit=crop",
      }
    ],
    "video": [
      {
        title: "Court - La Pomme Imaginaire",
        description: "Court-métrage d'animation 3D",
        imgUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1164&auto=format&fit=crop",
      },
      {
        title: "Spot Pub - J4",
        description: "Publicité motion design",
        imgUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1170&auto=format&fit=crop",
      },
      {
        title: "Motion Design",
        description: "Collection d'animations pour réseaux sociaux",
        imgUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1169&auto=format&fit=crop",
      }
    ]
  };

  return (
    <section className="project" id="projects">
      <div className="stars-1"></div>
      <div className="stars-2"></div>
      <div className="stars-3"></div>
      
      <Container>
        <div className="text-center mb-5">
          <h2 className="text-white mb-4">Mes Projets</h2>
          <p className="text-white">Découvrez mes différentes créations à travers ces trois domaines d'expertise</p>
        </div>

        <Tab.Container 
          id="projects-tabs" 
          defaultActiveKey="arts"
          onSelect={handleSelect}
        >
          <div className="nav-pills-container">
            <Nav ref={pillsRef} variant="pills" className="nav-pills mb-5 justify-content-center align-items-center">
              <div className="pill-indicator" style={indicatorStyle} />
              <Nav.Item>
                <Nav.Link eventKey="arts">
                  Arts Visuels & Narratifs
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="dev">
                  Développement & Tech
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="video">
                  Vidéaste
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <Tab.Content>
            <Tab.Pane eventKey="arts">
              <Row>
                {projects.arts.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="dev">
              <Row>
                {projects.dev.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="video">
              <Row>
                {projects.video.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </section>
  );
}

export default Projects;
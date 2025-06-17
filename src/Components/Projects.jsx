import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import '../styles/projects.css';
import { useRef, useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';

const Projects = () => {
  const pillsRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setAllProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const updateIndicator = (element) => {
    if (!element || !pillsRef.current) return;
    
    const rect = element.getBoundingClientRect();
    const parentRect = pillsRef.current.getBoundingClientRect();
    
    // Calculer la position relative par rapport au parent
    const left = rect.left - parentRect.left;
    
    setIndicatorStyle({
      width: `${rect.width}px`,
      transform: `translateX(${left}px)`,
      opacity: 1
    });
  };

  useEffect(() => {
    // Initialiser l'indicateur sur le premier onglet
    const initializeIndicator = () => {
      const activeTab = pillsRef.current?.querySelector('.nav-link.active');
      if (activeTab) {
        setIsInitialLoad(false);
        updateIndicator(activeTab);
      }
    };

    if (isInitialLoad) {
      // Petit délai pour laisser le DOM se mettre à jour
      setTimeout(initializeIndicator, 100);
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
  }, [isInitialLoad]);

  const handleSelect = (key) => {
    setActiveTab(key);
    
    // Mettre à jour l'indicateur avec une petite animation
    const selectedTab = pillsRef.current?.querySelector(`[data-rb-event-key="${key}"]`);
    if (selectedTab) {
      // D'abord, rendre l'indicateur légèrement transparent
      setIndicatorStyle(prev => ({ ...prev, opacity: 0.8 }));
      
      // Puis, après un court délai, le déplacer avec une opacité complète
      setTimeout(() => {
        updateIndicator(selectedTab);
      }, 50);
    }

    // Filtrer les projets
    if (key === 'all') {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter(project => project.category === key);
      setFilteredProjects(filtered);
    }
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

        {loading ? (
          <div className="text-center text-white">Chargement des projets...</div>
        ) : error ? (
          <div className="text-center text-red-500">Erreur: {error}</div>
        ) : (
          <div>
            <div className="nav-pills-container">
              <Nav ref={pillsRef} variant="pills" className="nav-pills mb-5 justify-content-center align-items-center">
                <div  />
                <Nav.Item>
                  <Nav.Link 
                    eventKey="all" 
                    active={activeTab === 'all'} 
                    onClick={() => handleSelect('all')}
                    className={activeTab === 'all' ? 'active' : ''}
                  >
                    Tous les projets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="arts" 
                    active={activeTab === 'arts'} 
                    onClick={() => handleSelect('arts')}
                    className={activeTab === 'arts' ? 'active' : ''}
                  >
                    Arts Visuels & Narratifs
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="dev" 
                    active={activeTab === 'dev'} 
                    onClick={() => handleSelect('dev')}
                    className={activeTab === 'dev' ? 'active' : ''}
                  >
                    Développement & Tech
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="video" 
                    active={activeTab === 'video'} 
                    onClick={() => handleSelect('video')}
                    className={activeTab === 'video' ? 'active' : ''}
                  >
                    Vidéaste
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <div className="projects-grid fade-in">
              {filteredProjects.map((project, index) => (
                <div key={index} className="project-item">
                  <div className="proj-imgbx">
                    <img src={project.imgurl} alt={project.title} />
                    <div className="proj-txtx">
                      <h4>{project.title}</h4>
                      <span>{project.description}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="no-projects-message">
                  Aucun projet trouvé dans cette catégorie
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Projects;
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

    const projects = [
        {
          title: "La Légende de la Flamme Imaginaire",
          description: "Série animée épique mêlant 2D/3D, narration transmédia, univers cosmogonique et pouvoirs liés aux idéaux.",
          imgUrl: "/assets/img/flamme-imaginaire.jpg",
          link: "https://yourdomain.com/flamme-imaginaire",
          category: "Roman",
        },
        {
          title: "La Fable du Héros et la Fée - Acte 1",
          description: "Roman fantasy féérique — Tournoi royal, intrigues politiques et lien entre un Héros muet et une Fée sans nom.",
          imgUrl: "/assets/img/fable-acte1.jpg",
          link: "https://www.wattpad.com/story/202925290-la-fable-du-h%C3%A9ros-et-la-f%C3%A9e-acte-1-il-%C3%A9tait-une",
          category: "Roman",
        },
        {
          title: "Le Héros et la Fée - Acte 2 : Puis vint la Revanche",
          description: "Suite directe de la Fable — enjeux renforcés, stratégies brillantes et conflits au sommet du pouvoir.",
          imgUrl: "/assets/img/fable-acte2.jpg",
          link: "https://www.wattpad.com/story/287182109-le-h%C3%A9ros-et-la-f%C3%A9e-acte-2-puis-vint-la-revanche",
          category: "Roman",
        },
        {
          title: "Vince de Belii (Wattpad)",
          description: "Slice of life fantastique — exploration du passé d’un jeune homme dans une ville figée dans la nuit.",
          imgUrl: "/assets/img/vince-wattpad.jpg",
          link: "https://www.wattpad.com/story/262133663-vince-de-belii",
          category: "Roman",
        },
        {
          title: "Vince de Belii (Webnovel)",
          description: "Version Webnovel — drames, cauchemars et renaissance à Belii, ville étrange au cœur figé.",
          imgUrl: "/assets/img/vince-webnovel.jpg",
          link: "https://www.webnovel.com/book/vince-de-belii_32967078000698505",
          category: "Roman",
        },
        {
          title: "La Fable du Héros et de la Fée (Webnovel)",
          description: "Publication alternative de la Fable, accessible au lectorat Webnovel.",
          imgUrl: "/assets/img/fable-webnovel.jpg",
          link: "https://www.webnovel.com/book/la-fable-du-h%C3%A9ros-et-de-la-f%C3%A9e_32771093408156705",
          category: "Roman",
        },
        {
          title: "BMS Talents",
          description: "Plateforme et incubateur de créateurs (devs, artistes, monteurs…) avec un site web et une communauté Discord.",
          imgUrl: "/assets/img/bms-talents.jpg",
          link: "https://github.com/ImaginaryFlame/BMSTalents",
          category: "Développement",
        },
        {
          title: "Portfolio React + Tailwind",
          description: "Site web personnel pour présenter mes œuvres, univers, projets narratifs et codes open-source.",
          imgUrl: "/assets/img/portfolio.jpg",
          link: "https://yourdomain.com/portfolio",
          category: "Développement",
        },
        {
          title: "Portfolio Photo & Réalisations - Idamah",
          description: "Travaux de Idamah, photographe et réalisateur : portraits sensibles, paysages narratifs et courts-métrages artistiques.",
          imgUrl: "/assets/img/idamah.jpg",
          link: "https://yourdomain.com/idamah",
          category: "Photo",
        },
        {
          title: "Miniature - Reels 01",
          description: "Miniature graphique conçue pour une vidéo short / reels Instagram.",
          imgUrl: "/assets/img/miniature-reels-01.jpg",
          category: "Vidéo",
        },
        {
          title: "Miniature - Reels 02",
          description: "Travail graphique sur un extrait manga à fort impact visuel.",
          imgUrl: "/assets/img/miniature-reels-02.jpg",
          category: "Vidéo",
        },
        {
          title: "Miniature - Reels 03",
          description: "Affiche stylisée réalisée pour un duel iconique dans un short animé.",
          imgUrl: "/assets/img/miniature-reels-03.jpg",
          category: "Vidéo",
        },
        {
          title: "Miniature - Reels 04",
          description: "Création visuelle dynamique pour teaser une vidéo YouTube ou un clip narratif.",
          imgUrl: "/assets/img/miniature-reels-04.jpg",
          category: "Vidéo",
        },
      ];
      

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Graphisme</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Developpement & Tech</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Vidéaste</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
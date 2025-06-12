import React from 'react';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Le Héros à la Flamme Imaginaire",
            description: `**Récit fantastique science-fantasy épique – série animée (en développement).**

Dans un monde où l'imaginaire façonne la réalité, Travis Wetu Cardoso, un adolescent impulsif et profondément humain, obtient un pouvoir qui deviendra mythique : la Flamme Imaginaire. Cette flamme, née des convictions les plus pures et des rêves les plus fous, peut transcender les lois du monde… ou les briser.

Entouré de parias aux passés brisés — assassins repentis, cyborgs oubliés, sirènes mutantes ou enfants-soldats — Travis mène une quête chaotique entre rires, combats cosmiques, foi intérieure et rédemption.

**Un récit où l'humour côtoie le tragique, la science croise la magie, et où chaque idéal devient une arme.**`,
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            title: "La Fable du Héros et la Fée",
            description: `**Roman de fantasy post-apocalyptique – trilogie littéraire en cours**

Dans le royaume enchanté de Sylvania, une fée sans nom, privée de ses ailes, rencontre un jeune garçon muet au passé trouble. Tous deux sont projetés dans une compétition royale où complots, rivalités princières et épreuves absurdes dissimulent les blessures profondes d'un monde à la dérive.

Derrière la féérie, la guerre, la satire et le drame se mêlent dans une quête d'identité, d'amour et de mémoire. Face à l'éveil de l'éternel ennemi de l'humanité, une entité si redoutable qu'elle avait autrefois plongé la création entière dans les ténèbres avant d'être scellée, ces deux êtres doivent s'unir malgré leurs différences.

L'espoir de toute existence repose désormais entre leurs mains, liées par un héritage qui pourrait autant les sauver que les détruire.

**Un conte doux-amer, poétique et acide, où l'enfance s'affronte à l'Histoire, et où les cœurs brisés sont les véritables souverains.**`,
            image: "https://via.placeholder.com/150"
        }
        {
            id: 3,
            title: "Vince de Belii",
            description: `**Urban fantasy tranche de vie intimiste – roman psychologique et surnaturel**
Vince, fraîchement diplômé de son master, se retrouve perdu sur la suite de sa vie et n'en voit pas le bout. Contacté par sa tante Déameline, il décide de rentrer dans sa ville natale de Belii, là où la nuit se finit jamais pour se ressourcer le temps des vacances d'été, voire plus longtemps.

Là-bas il y fera la rencontre de nouveaux amis et retrouvera de nouvelles têtes, tous ne seront pas amicaux avec lui, il devra alors renouer certains liens et faire la lumière sur des éléments de son passé qu'il avait enfui en lui.

Entre drames, cauchemars, fantastique, amours (et plus encore), vous verrez le passé, le présent et le futur de celui qu'on surnommait, autrefois, "Vince the Stampede".
**Cauchemars, amour, souvenirs et réalités distordues se confondent dans un drame humain et mystique où Vince devra affronter la vérité qu’il a voulu oublier… Passé de celui qu'on surnommait, autrefois, "Vince the Stampede".**`,
            image: "https://via.placeholder.com/150"
        }
        {
            id: 4,
            title: "Prototype de Rôle play game",
            description: `Prototype de Rôle play game pour le Héros à la Flamme Imaginaire. RPG sur Unity`
            image: "https://via.placeholder.com/150"
        }
        {
            id: 5,
            title: "Portfolio de Imaginary Flame",
            description: `Portfolio de Imaginary Flame pour mes animations, mes dessins, mes univers créatifs et mes projets numériques`
            image: "https://via.placeholder.com/150"
        }
        {
            id: 6,
            title: "BMS Talents",
            description: `Incubateur de talents pour les fans et jeunes talents de BMS`
            image: "https://via.placeholder.com/150"
        }
        {
            id: 7,
            title: "Portfolio de Idamah",
            description: `Portfolio de Idamah pour son univers créatifs, ses photos et ses réalisations`
            image: "https://via.placeholder.com/150"
        }
    ];

    return (
      <section className="project" id="project">
        <Container>
            <Row>
                <Col>
                    <h2>Mes projets</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    <table.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <table.Content>
                    <table.Pane eventKey="first">
                        <Row>
                            {
                                projects.map((project) => ((project, index) => {
                                    return (
                                        <p>{project.title}</p>
                                    )
                                })
                                }
                            }
                        </Row>
                    </table.Pane>
                    <table.Pane eventKey="second">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</table.Pane>
                    <table.Pane eventKey="third">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</table.Pane>
                    </table.Content>
                    </table.Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Projects;
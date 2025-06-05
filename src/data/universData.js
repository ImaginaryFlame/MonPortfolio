const universeConnections = {
    universes: [
      {
        id: "hero-fairy",
        title: "La Fable du Héros et la Fée",
        path: "/universe/hero-fairy",
        connectedTo: ["flamme-imaginaire"], // Indique les connexions
        isSideStory: true 
      },
      {
        id: "flamme-imaginaire",
        title: "Le Héros à la Flamme Imaginaire",
        path: "/universe/flamme-imaginaire",
        connectedTo: ["hero-fairy"],
        isMainSeries: true // Série principale
        isOriginStory: true // Pour indiquer que c'est l'histoire d'origine
      },
      {
        id: "vince-belii",
        title: "Vince de Belii",
        path: "/universe/vince-belii",
        connectedTo: [],
        // Univers indépendant
      },
      {
        id: "lara-pandemic",
        title: "La Pandémie de Lara",
        path: "/universe/lara-pandemic",
        connectedTo: [], // Univers indépendant
      },
      {
        id: "secret-project",
        title: "Projet Secret",
        path: "/universe/secret",
        isSecret: true,
        connectedTo: []
      }
    ]
  };
  
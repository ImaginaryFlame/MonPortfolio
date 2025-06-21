const univers = {
  name: 'univers',
  title: 'Univers',
  type: 'document',
  fields: [
    {
      name: 'nom',
      type: 'string',
      title: 'Nom de l\'univers',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description générale',
      rows: 4
    },
    {
      name: 'genres',
      title: 'Genres de l\'univers',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Fantasy', value: 'fantasy'},
          {title: 'Science-Fiction', value: 'science_fiction'},
          {title: 'Fantastique', value: 'fantastique'},
          {title: 'Space Opera', value: 'space_opera'},
          {title: 'Cyberpunk', value: 'cyberpunk'},
          {title: 'Steampunk', value: 'steampunk'},
          {title: 'Post-apocalyptique', value: 'post_apocalyptic'},
          {title: 'Dystopie', value: 'dystopia'},
          {title: 'Utopie', value: 'utopia'},
          {title: 'Urban Fantasy', value: 'urban_fantasy'},
          {title: 'Super-héros', value: 'superhero'},
          {title: 'Horreur', value: 'horror'},
          {title: 'Thriller / Polar', value: 'thriller_crime'},
          {title: 'Aventure', value: 'adventure'},
          {title: 'Historique', value: 'historical'},
          {title: 'Mythologique', value: 'mythological'},
          {title: 'Comédie', value: 'comedy'},
          {title: 'Drame', value: 'drama'},
          {title: 'Contemporain', value: 'contemporary'},
          {title: 'Autre', value: 'other'}
        ],
      },
    },
    {
      name: 'regions',
      type: 'array',
      title: 'Régions principales',
      of: [
        {
          type: 'reference',
          to: [{type: 'region'}]
        }
      ]
    },
    {
      name: 'races',
      type: 'array',
      title: 'Races principales',
      of: [
        {
          type: 'reference',
          to: [{type: 'race'}]
        }
      ]
    },
    {
      name: 'loisMagiques',
      type: 'text',
      title: 'Lois magiques / règles spéciales',
      rows: 4
    },
    {
      name: 'technologie',
      type: 'text',
      title: 'Niveau technologique',
      rows: 3
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image représentative',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'nom',
      genres: 'genres',
      media: 'image'
    },
    prepare(selection) {
      const {title, genres, media} = selection;
      const displayGenres = genres && genres.length > 0 ? genres.join(', ') : 'Genre non spécifié';
      return {
        title: title,
        subtitle: displayGenres,
        media: media
      };
    }
  }
}

export default univers
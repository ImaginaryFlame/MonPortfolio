export default {
  name: 'objet',
  title: '🎒 Objets',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'type',
      title: 'Type d\'objet',
      type: 'string',
      options: {
        list: [
          { title: 'Arme', value: 'arme' },
          { title: 'Armure', value: 'armure' },
          { title: 'Accessoire', value: 'accessoire' },
          { title: 'Consommable', value: 'consommable' },
          { title: 'Relique', value: 'relique' },
          { title: 'Artéfact', value: 'artefact' },
          { title: 'Autre', value: 'autre' }
        ]
      }
    },
    {
      name: 'rarete',
      title: 'Rareté',
      type: 'string',
      options: {
        list: [
          { title: 'Commun', value: 'commun' },
          { title: 'Peu commun', value: 'peu_commun' },
          { title: 'Rare', value: 'rare' },
          { title: 'Très rare', value: 'tres_rare' },
          { title: 'Légendaire', value: 'legendaire' },
          { title: 'Unique', value: 'unique' }
        ]
      }
    },
    {
      name: 'origine',
      title: 'Origine',
      type: 'reference',
      to: [{ type: 'region' }]
    },
    {
      name: 'proprietaire',
      title: 'Propriétaire actuel',
      type: 'reference',
      to: [{ type: 'personnage' }]
    },
    {
      name: 'proprietairesAnterieurs',
      title: 'Propriétaires antérieurs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'personnage' }] }]
    },
    {
      name: 'pouvoirs',
      title: 'Pouvoirs et capacités',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'nom',
            title: 'Nom du pouvoir',
            type: 'string'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text'
          },
          {
            name: 'conditions',
            title: 'Conditions d\'utilisation',
            type: 'text'
          }
        ]
      }]
    },
    {
      name: 'histoire',
      title: 'Histoire de l\'objet',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'spoilerLevel',
      title: 'Niveau de spoiler',
      type: 'string',
      options: {
        list: [
          { title: 'Aucun spoiler', value: 'none' },
          { title: 'Spoiler léger', value: 'light' },
          { title: 'Spoiler moyen', value: 'medium' },
          { title: 'Spoiler majeur', value: 'major' }
        ]
      },
      initialValue: 'none'
    }
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'type',
      media: 'image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle,
        media: media
      };
    }
  }
}
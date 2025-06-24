export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom du tag',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Catégorie de projet',
      type: 'string',
      options: {
        list: [
          { title: '🎨 Arts Visuels & Narratifs', value: 'arts-visuels-narratifs' },
          { title: '💻 Développement & Tech', value: 'developpement-tech' },
          { title: '🎬 Vidéaste', value: 'videaste' },
          { title: '🎮 Game Development', value: 'game-development' },
          { title: '🌐 Web & Digital', value: 'web-digital' }
        ]
      },
      description: 'Cette catégorie est utilisée uniquement pour filtrer les tags disponibles lors de la création de projets'
    },
    {
      name: 'colorType',
      title: 'Type de couleur',
      type: 'string',
      options: {
        list: [
          { title: '🎨 Couleur prédéfinie', value: 'preset' },
          { title: '🖌️ Couleur personnalisée', value: 'custom' }
        ]
      },
      initialValue: 'preset',
      validation: Rule => Rule.required()
    },
    {
      name: 'presetColor',
      title: 'Couleur prédéfinie',
      type: 'string',
      options: {
        list: [
          // Couleurs par catégorie - Arts Visuels
          { title: '🟣 Violet', value: '#8B5CF6' },
          { title: '🔴 Rose', value: '#EC4899' },
          { title: '💜 Indigo', value: '#6366F1' },
          { title: '🟦 Lavande', value: '#A855F7' },
          
          // Couleurs par catégorie - Développement  
          { title: '🔵 Bleu', value: '#3B82F6' },
          { title: '🟦 Cyan', value: '#06B6D4' },
          { title: '🔷 Bleu Foncé', value: '#1E40AF' },
          { title: '💙 Turquoise', value: '#0891B2' },
          
          // Couleurs par catégorie - Vidéo
          { title: '🔴 Rouge', value: '#EF4444' },
          { title: '🟠 Orange', value: '#F97316' },
          { title: '🟡 Ambre', value: '#F59E0B' },
          { title: '🍊 Orange Vif', value: '#EA580C' },
          
          // Couleurs par catégorie - Game Dev
          { title: '🟢 Vert', value: '#10B981' },
          { title: '🌿 Émeraude', value: '#059669' },
          { title: '💚 Vert Lime', value: '#65A30D' },
          { title: '🌱 Vert Foncé', value: '#047857' },
          
          // Couleurs par catégorie - Web & Digital
          { title: '🟣 Indigo', value: '#4F46E5' },
          { title: '💜 Violet Foncé', value: '#7C3AED' },
          { title: '🔮 Améthyste', value: '#9333EA' },
          { title: '🌌 Indigo Profond', value: '#3730A3' },
          
          // Couleurs neutres polyvalentes
          { title: '⚫ Noir', value: '#1F2937' },
          { title: '⚪ Gris Clair', value: '#9CA3AF' },
          { title: '🔘 Gris', value: '#6B7280' },
          { title: '⬛ Gris Foncé', value: '#374151' },
          { title: '🤍 Blanc', value: '#F9FAFB' },
          
          // Couleurs spéciales
          { title: '⭐ Doré', value: '#FBBF24' },
          { title: '🥈 Argenté', value: '#D1D5DB' },
          { title: '🥉 Bronze', value: '#92400E' },
          { title: '💎 Diamant', value: '#E5E7EB' }
        ],
        layout: 'radio'
      },
      hidden: ({ document }) => document?.colorType !== 'preset',
      description: 'Choisissez une couleur parmi les options prédéfinies'
    },
    {
      name: 'customColor',
      title: 'Couleur personnalisée',
      type: 'color',
      description: 'Utilisez le color picker pour choisir une couleur personnalisée',
      hidden: ({ document }) => document?.colorType !== 'custom',
      options: {
        disableAlpha: true
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      colorType: 'colorType',
      presetColor: 'presetColor',
      customColor: 'customColor'
    },
    prepare(selection) {
      const { title, subtitle, colorType, presetColor, customColor } = selection;
      
      // Déterminer la couleur finale
      let finalColor = '#9CA3AF'; // Couleur par défaut (gris)
      if (colorType === 'preset' && presetColor) {
        finalColor = presetColor;
      } else if (colorType === 'custom' && customColor?.hex) {
        finalColor = customColor.hex;
      }
      
      return {
        title: title,
        subtitle: subtitle,
        media: {
          type: 'div',
          style: { 
            width: '20px', 
            height: '20px', 
            backgroundColor: finalColor, 
            borderRadius: '50%',
            border: '2px solid #E5E7EB'
          }
        }
      };
    }
  }
}; 
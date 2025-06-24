# 🚀 Guide de création des sous-catégories - Sanity Studio

## ⚠️ **IMPORTANT : Vous devez créer les sous-catégories manuellement !**

Les schémas sont en place, mais les **données réelles** des sous-catégories doivent être créées dans l'interface Sanity Studio.

---

## 🎯 **Étapes pour créer vos premières sous-catégories**

### 1. **Accédez à Sanity Studio**
**URL :** http://localhost:3333

### 2. **Trouvez le menu "Sous-catégorie"**
- Dans le menu de gauche, cherchez **"Sous-catégorie"**
- Si vous ne le voyez pas, vérifiez que le serveur est bien démarré

### 3. **Créez vos premières sous-catégories**

---

## 📋 **Exemples de sous-catégories à créer**

### 🔥 **Pour Flamme Imaginaire (Bleu)**

#### Personnages - Protagonistes
```
Titre (FR): Héros Principal
Titre (EN): Main Hero
Titre (PT): Herói Principal
Titre (JA): 主人公
Catégorie parente: Personnages - Protagonistes
Couleur: #4F46E5
Icône: 🦸
Ordre: 1
Actif: ✓
```

#### Objets - Armes
```
Titre (FR): Épée Légendaire
Titre (EN): Legendary Sword
Titre (PT): Espada Lendária
Titre (JA): 伝説の剣
Catégorie parente: Objets - Armes
Couleur: #3B82F6
Icône: ⚔️
Ordre: 1
Actif: ✓
```

#### Régions - Royaumes
```
Titre (FR): Royaume de Flamme
Titre (EN): Flame Kingdom
Titre (PT): Reino da Chama
Titre (JA): 炎の王国
Catégorie parente: Régions - Royaumes
Couleur: #4F46E5
Icône: 🏰
Ordre: 1
Actif: ✓
```

---

### ⚔️ **Pour Vince de Belii (Violet)**

#### Personnages - Antagonistes
```
Titre (FR): Antagoniste Principal
Titre (EN): Main Antagonist
Titre (PT): Antagonista Principal
Titre (JA): 主な敵役
Catégorie parente: Personnages - Antagonistes
Couleur: #8B5CF6
Icône: 👹
Ordre: 1
Actif: ✓
```

#### Factions - Maisons Nobles
```
Titre (FR): Maison de Belii
Titre (EN): House of Belii
Titre (PT): Casa de Belii
Titre (JA): ベリイ家
Catégorie parente: Factions - Maisons Nobles
Couleur: #A855F7
Icône: ⚔️
Ordre: 1
Actif: ✓
```

---

### 🦠 **Pour Pandémie de Lara (Rouge)**

#### Événements - Catastrophes
```
Titre (FR): Épidémie Majeure
Titre (EN): Major Epidemic
Titre (PT): Epidemia Maior
Titre (JA): 大流行病
Catégorie parente: Événements - Catastrophes
Couleur: #EF4444
Icône: ☠️
Ordre: 1
Actif: ✓
```

#### Bestiaires - Morts-vivants
```
Titre (FR): Infecté Viral
Titre (EN): Viral Infected
Titre (PT): Infectado Viral
Titre (JA): ウイルス感染者
Catégorie parente: Bestiaires - Morts-vivants
Couleur: #F97316
Icône: 🧟
Ordre: 1
Actif: ✓
```

---

### 🧚 **Pour Héros Fée (Rose/Cyan)**

#### Races - Fantastiques
```
Titre (FR): Fée Élémentaire
Titre (EN): Elemental Fairy
Titre (PT): Fada Elemental
Titre (JA): エレメンタル妖精
Catégorie parente: Races - Fantastiques
Couleur: #EC4899
Icône: 🧚
Ordre: 1
Actif: ✓
```

#### Concepts - Magies
```
Titre (FR): Magie des Fées
Titre (EN): Fairy Magic
Titre (PT): Magia das Fadas
Titre (JA): 妖精の魔法
Catégorie parente: Concepts - Magies
Couleur: #06B6D4
Icône: ✨
Ordre: 1
Actif: ✓
```

---

## 🎯 **Instructions détaillées**

### **Dans Sanity Studio :**

1. **Cliquez sur "Sous-catégorie"** dans le menu de gauche
2. **Cliquez sur "Créer"** (bouton + ou "Create")
3. **Remplissez les champs :**
   - **Titre** : Ajoutez le nom dans chaque langue (FR, EN, PT, JA)
   - **Description** : Optionnel, décrivez la sous-catégorie
   - **Catégorie parente** : Sélectionnez dans la liste (ex: "Personnages - Protagonistes")
   - **Couleur thématique** : Code hex (ex: #4F46E5)
   - **Icône** : Emoji (ex: 🦸)
   - **Ordre d'affichage** : Numéro (1, 2, 3...)
   - **Actif** : Cochez la case
4. **Cliquez sur "Publier"**

### **Après création :**
- Les sous-catégories apparaîtront automatiquement dans les formulaires de création de fiches
- Le filtrage se fera automatiquement selon le type sélectionné

---

## 🔄 **Test du système**

1. **Créez quelques sous-catégories** (utilisez les exemples ci-dessus)
2. **Créez/modifiez un personnage** :
   - Sélectionnez "Type de personnage" → "Protagoniste"
   - Le champ "Sous-catégorie" devrait se mettre à jour automatiquement
   - Vous devriez voir vos sous-catégories "Personnages - Protagonistes"

---

## 💡 **Conseils**

- **Commencez petit** : Créez 2-3 sous-catégories par univers pour tester
- **Utilisez les couleurs thématiques** : Cela aide à identifier visuellement vos univers
- **Ordre logique** : Numérotez vos sous-catégories pour un affichage cohérent
- **Testez le filtrage** : Vérifiez que les sous-catégories apparaissent bien dans les formulaires

---

## ❓ **Si vous ne voyez pas le menu "Sous-catégorie"**

1. **Vérifiez que le serveur fonctionne** : http://localhost:3333
2. **Rechargez la page** (F5 ou Ctrl+R)
3. **Vérifiez la console** pour des erreurs JavaScript
4. **Redémarrez le serveur** si nécessaire

---

**Une fois vos premières sous-catégories créées, le système sera pleinement fonctionnel ! 🎉** 
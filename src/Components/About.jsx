import { Card, CardContent } from "@/Components/ui/card";
import { Sparkles, Code, Paintbrush2, Gamepad2, Flame, Users, Video, Instagram, Twitter, MessageCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-12 px-4 md:px-12 bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] text-white">
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-right {
          animation: slideInFromRight 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-bottom {
          animation: slideInFromBottom 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }
      `}</style>
      
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="mt-20 animate-fade-in delay-100">
          <h1 className="text-4xl md:text-5xl font-bold text-center flex items-center justify-center">
            <Flame className="mr-3 text-orange-500 animate-pulse" />
            Imaginary Flame
            <Flame className="ml-3 text-orange-500 animate-pulse" />
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8 animate-slide-bottom delay-200">
          <div className="lg:w-1/3">
            <img 
              src="/assets/20220726_002242.webp"
              alt="Flame - Créateur transmédia" 
              className="w-full max-w-sm mx-auto rounded-lg shadow-2xl border-2 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
            />
          </div>
          <div className="lg:w-2/3">
            <p className="text-lg leading-relaxed">
              Je suis <strong>Flame</strong>, 25 ans, créateur autodidacte passionné par l'art numérique et la narration transmédia. 
              Je développe des univers où se mêlent <em>code</em>, <em>animation</em>, <em>écriture</em> et <em>design</em>, 
              avec l'ambition de devenir <strong>animateur 2D/3D</strong>, <strong>game designer</strong> et 
              <strong> créateur indépendant</strong> de récits qui transcendent les frontières culturelles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-left delay-300">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Code className="mr-2" /> Stack Technique
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>Développement :</strong> Java, JavaScript, C++, C#
                </p>
                <p>
                  <strong>Création 3D/2D :</strong> Blender, Maya, Photoshop, Clip Studio Paint
                </p>
                <p>
                  <strong>Post-production :</strong> After Effects, Nuke, DaVinci Resolve, Filmora
                </p>
                <p>
                  <strong>Écriture & Organisation :</strong> Final Draft, Word, Obsidian
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-400">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Paintbrush2 className="mr-2" /> Setup Créatif
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>PC principal :</strong><br />
                  Alienware Aurora R13 • Intel Core i5-12400F<br />
                  RTX 3070 • 16 Go RAM DDR5 • SSD NVMe 2 To<br />
                  Configuration double écran QHD
                </p>
                <p>
                  <strong>Périphériques :</strong><br />
                  Tablette Gaomon pour le dessin numérique et l'animation<br />
                  iPad Air M1 pour le dessin et l'animation mobile
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 md:col-span-2 animate-slide-bottom delay-500">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Gamepad2 className="mr-2" /> Univers & Licence Principale
              </h2>
              <div className="space-y-3">
                <p>
                  Je développe <strong>"Le Héros à la Flamme Imaginaire"</strong>, une licence transmédia ambitieuse 
                  mêlant shōnen, slice of life, aventure psychologique et comédie satirique dans la lignée de 
                  <em>Tout le Monde Déteste Chris</em>, <em>Malcolm</em> ou <em>Boondocks</em>. L'histoire suit Travis Wetu Cardoso 
                  dans un monde fracturé, inspiré de <strong>Vesontio</strong> (Besançon alternatif) 
                  et de dimensions parallèles, explorant les luttes identitaires et la quête de soi avec un humour 
                  oscillant entre cartoon, comédie de buddy movie et satire, parsemé de moments slapstick.
                </p>
                <p>
                  <strong>Thématiques centrales :</strong> Le pardon, la rédemption, le passage à l'âge adulte, la maladie, 
                  l'espoir, la force et la fragilité des idéaux, le rejet, l'exclusion et la revalorisation de ceux laissés pour compte, 
                  le rapport au temps, l'impossible utopie et la lutte pour la rédemption, la technologie comme écho de l'humain, la famille.
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Influences :</strong> Vinland Saga, Fate Realta Nua, Static Shock, Boondocks, Tout le Monde Déteste Chris, 
                  My Hero Academia, Superman, Spider-Man, Magi: The Labyrinth of Magic, Black Clover, Evangelion, 
                  Dragon Quest: la Quête de Daï, Medaka Box, Bleach, la Métamorphose, Bel-Ami, Gravity Rush, 
                  Devil May Cry, Jak and Daxter, Ratchet & Clank, la licence Fallout.
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Styles visuels :</strong> Megumi Ishitani, Vincent Chansard, Naotoshi Shida, Katsuyoshi Nakatsuru, 
                  Yuya Takahashi, Yuki Hayashi, sute (dont l'impact frame de l'épisode 167 m'a donné envie de devenir animateur).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 md:col-span-2 animate-slide-left delay-600">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Sparkles className="mr-2" /> Projets Narratifs
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-orange-300">La Fable du Héros et la Fée</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Une trilogie de romans explorant l'amitié improbable entre un héros déchu et une fée mystérieuse. 
                    Cette saga mélange fantasy épique et introspection psychologique, questionnant la nature du heroïsme 
                    et la valeur de la rédemption à travers des personnages complexes naviguant entre lumière et ombres.
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Résumé :</strong> Dans un monde déchiré par la fusion ancienne entre l'univers humain et le royaume féérique, 
                    les cendres de la guerre, du rejet et de l'injustice continuent d'alimenter les rêves brisés de ceux qu'on a toujours laissés de côté. 
                    Elle, c'est une jeune Fée née sans ailes, méprisée de tous, vivant dans les Basfonds de Sylvania, dernier bastion d'une monarchie aussi brillante que pourrie de l'intérieur. 
                    Lui, c'est un humain errant, survivant d'un massacre oublié, porteur d'un pouvoir dévastateur et d'un nom effacé, que l'on surnomme avec crainte… le Héros. 
                    Entre complots royaux, rivalités tribales, assassinats politiques et tournois meurtriers, ils devront apprendre à survivre, à se haïr, à s'entraider… 
                    et peut-être à réécrire les règles d'un monde qui ne leur a jamais laissé de place.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-orange-300">Vince de Belii</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Un light novel intimiste centré sur la reconstruction personnelle et la poursuite de rêves apparemment impossibles. 
                    Cette histoire explore les thèmes de la solitude, de l'espoir et de la persévérance face à l'adversité. 
                    Actuellement en cours d'adaptation en visual novel que je développe moi-même dans le cadre de mon apprentissage du médium.
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Résumé :</strong> Vince, fraîchement diplômé de son master, se retrouve perdu sur la suite de sa vie et n'en voit pas le bout. 
                    Contacté par sa tante Déameline, il décide de rentrer dans sa ville natale de Belii, là où la nuit ne se finit jamais, 
                    pour se ressourcer le temps des vacances d'été, voire plus longtemps. Là-bas il y fera la rencontre de nouveaux amis et retrouvera de nouvelles têtes, 
                    tous ne seront pas amicaux avec lui. Il devra alors renouer certains liens et faire la lumière sur des éléments de son passé qu'il avait enfui en lui. 
                    Entre drames, cauchemars, fantastique, amours (et plus encore), découvrez le passé, le présent et le futur de celui qu'on surnommait, autrefois, "Vince the Stampede".
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-orange-300">La Pandémie de Lara</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Un récit post-apocalyptique explorant les conséquences humaines d'une crise sanitaire à travers le prisme d'une protagoniste 
                    confrontée à un monde en mutation. Cette histoire examine les liens sociaux, la résilience humaine et 
                    les transformations personnelles dans un contexte de bouleversement global.
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Résumé :</strong> Un récit post-apocalyptique avec des zombies suivant une protagoniste amnésique qui essaie de refaire sa vie. 
                    Son quotidien morbide est perturbé par la venue de deux jeunes filles qui semblent être ses meilleures amies de l'ancien monde. 
                    L'une d'entre elles semble avoir un objectif derrière la tête malgré la chaleur qu'elle dégage. 
                    Cette histoire explore la reconstruction de l'identité, les liens du passé et les mystères qui persistent même dans un monde en ruines.
                  </p>
                </div>
                <p className="text-sm text-gray-400 italic">
                  D'autres récits sont en développement, chacun explorant des genres et thématiques qui leur sont propres, 
                  bien qu'ils puissent partager certaines résonances narratives et philosophiques.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-700">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Video className="mr-2" /> Création de Contenu & Réseaux
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>Créateur de contenu</strong> sur <strong>YouTube</strong>, <strong>TikTok</strong> et <strong>Twitch</strong>, 
                  je partage ma passion pour l'animation, le game design et l'univers créatif. 
                  Mes contenus explorent les coulisses de mes projets, des tutoriels et des analyses d'œuvres qui m'inspirent. 
                  Sur Twitch, je live également des jeux vidéo en partageant mes découvertes et mes réflexions gaming.
                </p>
                <p>
                  <strong>Réseaux sociaux principaux :</strong> Retrouvez-moi sur mes différentes plateformes 
                  pour suivre mes actualités et échanger avec la communauté.
                </p>
                <div className="flex flex-wrap gap-2 mt-3 mb-4">
                  <a 
                    href="https://linktw.in/CxYRUG" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-xs hover:bg-red-600/30 transition-all duration-200 cursor-pointer"
                  >
                    YouTube
                  </a>
                  <a 
                    href="https://linktw.in/hmTRVU" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-black/20 text-white rounded-full text-xs hover:bg-black/30 transition-all duration-200 cursor-pointer"
                  >
                    TikTok
                  </a>
                  <a 
                    href="https://linktw.in/AKQspA" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs hover:bg-purple-600/30 transition-all duration-200 cursor-pointer"
                  >
                    Twitch
                  </a>
                  <a 
                    href="https://linktw.in/MTfPjC" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-xs hover:bg-pink-600/30 transition-all duration-200 cursor-pointer"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://linktw.in/WIyRoG" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs hover:bg-blue-600/30 transition-all duration-200 cursor-pointer"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://discord.gg/GrCeKzTjfC" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs hover:bg-indigo-600/30 transition-all duration-200 cursor-pointer"
                  >
                    Discord
                  </a>
                </div>
                <p>
                  <strong>Comptes dédiés au dessin :</strong> Suivez ma progression artistique et mes créations en cours sur mes comptes spécialisés.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <a 
                    href="https://linktw.in/JTYaRc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs hover:bg-blue-600/30 transition-all duration-200 cursor-pointer flex items-center gap-1"
                  >
                    🎨 Twitter Art
                  </a>
                  <a 
                    href="https://linktw.in/yfllTc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-xs hover:bg-pink-600/30 transition-all duration-200 cursor-pointer flex items-center gap-1"
                  >
                    🎨 Instagram Art
                  </a>
                  <a 
                    href="https://linktw.in/jGETsf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-black/20 text-white rounded-full text-xs hover:bg-black/30 transition-all duration-200 cursor-pointer flex items-center gap-1"
                  >
                    🎨 TikTok Art
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-left delay-800">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Users className="mr-2" /> Community Management & BMS Talents
              </h2>
              <div className="space-y-3">
                <p>
                  Gestionnaire du compte gimmick <strong>"Has Joel Streamed Today?"</strong>, 
                  j'ai développé une expertise en community management et en création d'événements en ligne. 
                  Cette expérience m'a appris à fédérer une communauté active, à créer de l'engagement 
                  et à maintenir une présence digitale cohérente.
                </p>
                <p>
                  <strong>Fondateur de BMS Talents</strong>, un projet dédié à la valorisation des créateurs 
                  au sein de la communauté esport BMS : artistes, développeurs, monteurs et streamers. 
                  Grâce au reach de mon compte "Has Joël Streamed Today?", j'ai pu réunir et fédérer une communauté de talents créatifs passionnés, 
                  leur offrant une plateforme pour se faire connaître et collaborer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 animate-slide-right delay-900">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Flame className="mr-2" /> Vision : Illunaris
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>Objectif à long terme :</strong> Créer <strong>Illunaris</strong> (nom provisoire), 
                  un studio transmédia rassemblant des talents de France, d'Angola et d'ailleurs 
                  pour développer des mondes visuellement époustouflants et humainement authentiques.
                </p>
                <p className="text-sm text-gray-300">
                  La construction d'Illunaris est un objectif que je veux atteindre en poursuivant 
                  mon apprentissage dans l'animation, l'informatique et le game design pour offrir 
                  au monde les univers créatifs auxquels je souhaite donner vie. Cette vision s'appuie 
                  sur l'expérience acquise en animation, développement, écriture, design et gestion 
                  de communauté pour créer des projets collaboratifs innovants.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
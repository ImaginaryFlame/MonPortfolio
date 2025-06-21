import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Code, Paintbrush2, Gamepad2, Flame } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-12 px-4 md:px-12 bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          <Flame className="inline-block mr-2 text-orange-500" /> Imaginary Flame
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
          <div className="lg:w-1/3">
            <img 
              src="https://i.imgur.com/your-image-id.jpg" 
              alt="Flame - Créateur transmédia" 
              className="w-full max-w-sm mx-auto rounded-lg shadow-2xl border-2 border-orange-500/30"
            />
          </div>
          <div className="lg:w-2/3">
            <p className="text-lg leading-relaxed">
              Je suis <strong>Flame</strong>, 25 ans, créateur autodidacte passionné par l'art numérique et la narration transmédia. 
              Je développe des univers où se mêlent <em>code</em>, <em>animation</em>, <em>écriture</em> et <em>design</em>, 
              avec l'ambition de devenir <strong>animateur 2D/3D</strong>, <strong>game designer</strong> et 
              <strong>créateur indépendant</strong> de récits qui transcendent les frontières culturelles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Code className="mr-2" /> Stack Technique
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>Développement :</strong> Java, JavaScript, C++, Unity
                </p>
                <p>
                  <strong>Création 3D/2D :</strong> Blender, Maya, Photoshop, Clip Studio Paint
                </p>
                <p>
                  <strong>Post-production :</strong> After Effects, Nuke, DaVinci Resolve, Filmora
                </p>
                <p>
                  <strong>Écriture & Organisation :</strong> Final Draft, Obsidian
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
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
                  Tablette Gaomon pour l'animation<br />
                  iPad Air M1 pour la création mobile
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300 md:col-span-2">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Gamepad2 className="mr-2" /> Univers & Licence Principale
              </h2>
              <div className="space-y-3">
                <p>
                  Je développe <strong>"Le Héros à la Flamme Imaginaire"</strong>, une licence transmédia ambitieuse 
                  mêlant shōnen, slice of life et aventure psychologique. L'histoire suit Travis Wetu Cardoso 
                  dans un monde fracturé, inspiré de <strong>Vesontio</strong> (Besançon alternatif) 
                  et de dimensions parallèles, explorant les luttes identitaires et la quête de soi.
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Influences :</strong> Vinland Saga, Magi, Fate/Stay Night, Static Shock, Spider-Verse, 
                  et les œuvres de Horikoshi, Megumi Ishitani, Chansard, Nakamura
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Sparkles className="mr-2" /> Projets Narratifs
              </h2>
              <div className="space-y-3">
                <p>
                  Auteur de la trilogie <strong>"Le Héros & la Fée"</strong> et du light novel 
                  <strong>"Vince de Belii"</strong>, actuellement en cours d'adaptation en visual novel.
                </p>
                <p className="text-sm text-gray-300">
                  Chaque histoire explore l'amitié, la solitude, la reconstruction personnelle 
                  et la poursuite de rêves apparemment impossibles.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-orange-500/20 border shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-orange-400 flex items-center">
                <Flame className="mr-2" /> Vision & Communauté
              </h2>
              <div className="space-y-3">
                <p>
                  Fondateur du projet <strong>BMS Talents</strong> au sein de la communauté esport BMS, 
                  dédié à la valorisation des créateurs : artistes, développeurs, monteurs et streamers. 
                  Grâce au reach de mon compte <strong>"Has Joel streamed"</strong>, j'ai pu réunir 
                  et fédérer une communauté de talents créatifs passionnés.
                </p>
                <p>
                  <strong>Objectif à long terme :</strong> Créer <strong>Imaginary Labs</strong>, 
                  un studio transmédia rassemblant des talents de France, d'Angola et d'ailleurs 
                  pour développer des mondes visuellement époustouflants et humainement authentiques. 
                  Cette vision s'appuie sur l'expérience acquise en animation, développement, écriture, 
                  design et gestion de communauté pour créer des projets collaboratifs innovants.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
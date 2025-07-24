import os

ABOUT_PATH = "src/pages/About.tsx"

framer_import = "import { motion } from 'framer-motion';"
svg_illu = '''
  <div className="flex justify-center mb-8">
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" stroke="#00FFFF" strokeWidth="6" fill="#18182f" />
      <path d="M40 70 Q60 100 80 70" stroke="#6E45E2" strokeWidth="4" fill="none"/>
      <circle cx="60" cy="55" r="18" fill="#6E45E2" stroke="#00FFFF" strokeWidth="3"/>
      <circle cx="60" cy="55" r="8" fill="#00FFFF" />
    </svg>
  </div>
'''

# Animations Framer Motion pour les titres et cartes
motion_h1 = """
<motion.h1
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text animate-fadeIn"
>
  À propos de Mosala
</motion.h1>
"""

motion_card = """
<motion.div
  whileHover={{ scale: 1.07, boxShadow: '0 10px 20px #00FFFF33' }}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  key={val.titre}
  className="bg-[#18182f] rounded-xl p-6 shadow-lg border border-[#23234a] flex flex-col items-center text-center"
>
  <span className="text-4xl mb-2">{val.icone}</span>
  <h3 className="text-xl font-semibold text-[#00FFFF] mb-1">{val.titre}</h3>
  <p className="text-[#F5F5F7] text-base">{val.texte}</p>
</motion.div>
"""

def patch_about():
    with open(ABOUT_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Ajout de l'import Framer Motion
    if "framer-motion" not in content:
        content = content.replace("import Footer", "import Footer\n" + framer_import)

    # Ajout de l'illustration SVG après le <Navbar />
    if '<svg' not in content:
        content = content.replace('<Navbar />', '<Navbar />\n' + svg_illu)

    # Remplacement du h1 par motion.h1 animé
    content = content.replace(
        'h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text animate-fadeIn"',
        motion_h1.strip().split('\n', 1)[0]
    )
    if 'motion.h1' not in content:
        content = content.replace(
            '<h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text animate-fadeIn">À propos de Mosala</h1>',
            motion_h1.strip()
        )

    # Remplacement des cartes valeurs par motion.div animé
    if 'motion.div' not in content:
        content = content.replace(
            'valeurs.map((val, idx) => (\n            <div',
            'valeurs.map((val, idx) => (\n            ' + motion_card.strip().split('\n', 1)[0]
        )
        content = content.replace(
            '<div\n              key={val.titre}\n              className="bg-[#18182f] rounded-xl p-6 shadow-lg border border-[#23234a] hover:scale-105 hover:shadow-cyan-400/30 transition-all duration-300 flex flex-col items-center text-center"\n            >\n              <span className="text-4xl mb-2">{val.icone}</span>\n              <h3 className="text-xl font-semibold text-[#00FFFF] mb-1">{val.titre}</h3>\n              <p className="text-[#F5F5F7] text-base">{val.texte}</p>\n            </div>',
            motion_card.strip()
        )

    with open(ABOUT_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("Page About modernisée avec animations et illustration SVG.")

if __name__ == "__main__":
    patch_about() 
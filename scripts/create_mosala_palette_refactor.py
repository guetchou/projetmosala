import re
from pathlib import Path

# 1. Ajout des variables CSS Mosala dans src/index.css
css_vars = '''
  /* Vert Mosala */
  --mosala-green-50:  #E6F9F0;
  --mosala-green-100: #B3F3E1;
  --mosala-green-200: #80ECD1;
  --mosala-green-300: #4DE4C2;
  --mosala-green-500: #009640;
  --mosala-green-600: #007A32;
  --mosala-green-700: #005F25;
  --mosala-green-800: #004418;
  --mosala-green-900: #00280C;

  /* Jaune Mosala */
  --mosala-yellow-50:  #FFFBE6;
  --mosala-yellow-100: #FFF6B3;
  --mosala-yellow-200: #FFEE80;
  --mosala-yellow-300: #FFE84D;
  --mosala-yellow-500: #FFD500;
  --mosala-yellow-600: #D4B400;
  --mosala-yellow-700: #A38E00;
  --mosala-yellow-800: #736600;
  --mosala-yellow-900: #413E00;

  /* Orange Mosala */
  --mosala-orange-50:  #FFF3E6;
  --mosala-orange-100: #FFE1B3;
  --mosala-orange-200: #FFD080;
  --mosala-orange-300: #FFC04D;
  --mosala-orange-500: #F39200;
  --mosala-orange-600: #C07400;
  --mosala-orange-700: #8E5600;
  --mosala-orange-800: #5C3900;
  --mosala-orange-900: #2A1B00;

  /* Rouge Mosala */
  --mosala-red-50:  #FDE6E7;
  --mosala-red-100: #FBB3B7;
  --mosala-red-200: #F78087;
  --mosala-red-300: #F44D58;
  --mosala-red-500: #E30613;
  --mosala-red-600: #B0040F;
  --mosala-red-700: #83000B;
  --mosala-red-800: #520007;
  --mosala-red-900: #210003;

  /* Neutres */
  --mosala-dark-50:  #F2F2F2;
  --mosala-dark-100: #D9D9D9;
  --mosala-dark-200: #BFBFBF;
  --mosala-dark-300: #A6A6A6;
  --mosala-dark-500: #222222;
  --mosala-dark-600: #1B1B1B;
  --mosala-dark-700: #141414;
  --mosala-dark-800: #0D0D0D;
  --mosala-dark-900: #060606;

  --mosala-white: #FFFFFF;
'''

def patch_index_css():
    path = Path('src/index.css')
    content = path.read_text(encoding='utf-8')
    if '--mosala-green-50:' not in content:
        content = re.sub(r'(:root \{)', r'\1\n' + css_vars, content, count=1)
        path.write_text(content, encoding='utf-8')
        print('✅ Variables CSS Mosala ajoutées à src/index.css')
    else:
        print('ℹ️ Variables CSS Mosala déjà présentes dans src/index.css')

# 2. Ajout de la palette Mosala dans tailwind.config.ts
palette_js = '''mosala: {
          green: {
            50:  '#E6F9F0',
            100: '#B3F3E1',
            200: '#80ECD1',
            300: '#4DE4C2',
            500: '#009640',
            600: '#007A32',
            700: '#005F25',
            800: '#004418',
            900: '#00280C',
          },
          yellow: {
            50:  '#FFFBE6',
            100: '#FFF6B3',
            200: '#FFEE80',
            300: '#FFE84D',
            500: '#FFD500',
            600: '#D4B400',
            700: '#A38E00',
            800: '#736600',
            900: '#413E00',
          },
          orange: {
            50:  '#FFF3E6',
            100: '#FFE1B3',
            200: '#FFD080',
            300: '#FFC04D',
            500: '#F39200',
            600: '#C07400',
            700: '#8E5600',
            800: '#5C3900',
            900: '#2A1B00',
          },
          red: {
            50:  '#FDE6E7',
            100: '#FBB3B7',
            200: '#F78087',
            300: '#F44D58',
            500: '#E30613',
            600: '#B0040F',
            700: '#83000B',
            800: '#520007',
            900: '#210003',
          },
          dark: {
            50:  '#F2F2F2',
            100: '#D9D9D9',
            200: '#BFBFBF',
            300: '#A6A6A6',
            500: '#222222',
            600: '#1B1B1B',
            700: '#141414',
            800: '#0D0D0D',
            900: '#060606',
          },
          white: '#FFFFFF',
        },'''

def patch_tailwind_config():
    path = Path('tailwind.config.ts')
    content = path.read_text(encoding='utf-8')
    if "mosala: {" not in content:
        # Remplace l'ancien bloc mosala ou l'ajoute dans extend.colors
        content = re.sub(r'(colors:\s*\{)', r'\1\n        ' + palette_js, content, count=1)
        path.write_text(content, encoding='utf-8')
        print('✅ Palette Mosala ajoutée à tailwind.config.ts')
    else:
        print('ℹ️ Palette Mosala déjà présente dans tailwind.config.ts')

# 3. Refactor Navbar.tsx pour utiliser la palette Mosala
color_map = [
    (r'text-\[#18182f\]', 'text-mosala-dark-500'),
    (r'text-gray-900', 'text-mosala-dark-500'),
    (r'text-gray-700', 'text-mosala-dark-300'),
    (r'text-gray-600', 'text-mosala-dark-200'),
    (r'text-gray-500', 'text-mosala-dark-200'),
    (r'hover:text-\[#6E45E2\]', 'hover:text-mosala-green-500'),
    (r'hover:bg-gray-50/50', 'hover:bg-mosala-green-50'),
    (r'hover:bg-gray-50', 'hover:bg-mosala-green-50'),
    (r'bg-white/90', 'bg-mosala-white/90'),
    (r'bg-white', 'bg-mosala-white'),
    (r'bg-gray-100/50', 'bg-mosala-green-50'),
    (r'bg-gray-100', 'bg-mosala-green-50'),
    (r'border-gray-200/50', 'border-mosala-dark-100/50'),
    (r'border-gray-200', 'border-mosala-dark-100'),
    (r'border-gray-900/5', 'border-mosala-dark-900/5'),
    (r'border-gray-900', 'border-mosala-dark-900'),
    (r'border-transparent', 'border-transparent'),
    (r'text-gray-400', 'text-mosala-dark-200'),
    (r'bg-gradient-to-r from-\[#6E45E2\] to-\[#00C4CC\]', 'bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500'),
    (r'hover:from-\[#6E45E2\]/90 hover:to-\[#00C4CC\]/90', 'hover:from-mosala-green-600 hover:to-mosala-yellow-600'),
    (r'focus:border-\[#6E45E2\]', 'focus:border-mosala-green-500'),
    (r'focus:ring-\[#6E45E2\]/50', 'focus:ring-mosala-green-500/50'),
    (r'bg-gray-50', 'bg-mosala-green-50'),
    (r'text-white', 'text-mosala-white'),
    (r'bg-white/10', 'bg-mosala-white/10'),
    (r'hover:bg-\[#6E45E2\]/10', 'hover:bg-mosala-green-500/10'),
]

def patch_navbar():
    path = Path('src/components/Navbar.tsx')
    content = path.read_text(encoding='utf-8')
    for pattern, repl in color_map:
        content, n = re.subn(pattern, repl, content)
        if n > 0:
            print(f'✅ Remplacé {pattern} par {repl} ({n} occurence(s))')
    path.write_text(content, encoding='utf-8')
    print('✅ Navbar.tsx refactorisé avec la palette Mosala')

if __name__ == "__main__":
    patch_index_css()
    patch_tailwind_config()
    patch_navbar() 
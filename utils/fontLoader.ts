import { FontConfig } from '../types';

export const loadCustomFonts = (): Promise<FontFace[][]> => {
  const fonts: FontConfig[] = [
    { name: 'AtAero-Regular', files: ['/public/fonts/AtAero-Regular.otf'] },
    { name: 'Elianto-Regular', files: ['/public/fonts/Elianto-Regular.otf'] },
    { name: 'Elianto-Regular', files: ['/public/fonts/kanopibrazil-regular.otf'] },
  ];

  return Promise.all(
    fonts.map((font: FontConfig) => {
      return Promise.all(
        font.files.map((file: string) => {
          const fontFace = new FontFace(font.name, `url(${file})`);
          return fontFace.load().then((loadedFont: FontFace) => {
            document.fonts.add(loadedFont);
            return loadedFont;
          });
        })
      );
    })
  );
};

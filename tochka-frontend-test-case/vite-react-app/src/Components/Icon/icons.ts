// icons.ts

const svgIcons = import.meta.glob('../../../public/*.svg', { eager: true });

const iconsMap: Record<string, string> = {};

for (const path in svgIcons) {
  const iconName = path.split('/').pop() || ''; // Извлекаем имя файла (с расширением)
  iconsMap[iconName] = (svgIcons[path] as any).default; // Берем дефолтный экспорт для каждого SVG
}

export default iconsMap;


# Тестовое для стажера frontend - разработчика в Точку

# Что нужно сделать?

Реализовать часть уже существующего сервиса по [макету](https://www.figma.com/design/GfMMiw4DMrIp1D9D9hEQ3e/Tochka_Frontend-Test-Case-(Copy)?node-id=1-4459&t=MK31EMuEPdRRFOwI-1) (пароль тебе скажет твой hr), а именно:

1) Сверстать макет
2) Реализовать, так называемый, infinite scroll. Показателем того, что данные закончились служит приход пустого массива.
3) \* Реализовать фильтрацию по дате и типу события

Примеры ответов лежат в файле handlers.ts

Менять можно что угодно, главное - результат.

Все вопросы, пожелания, уточнения по тестовому - приветствуются и не осуждаются.

Стандартный readme оставлю на всякий случай. Удачи)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

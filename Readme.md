# Dayme

Dayme - это простой и современный шаблон для быстрого старта React и Vue приложений.

## Особенности
### React
- ⚛️ [React](https://react.dev/)
- ⚡️ [Vite](https://vitejs.dev/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 📝 [TypeScript](https://www.typescriptlang.org/)
- 🔄 [React Router](https://reactrouter.com/)
- 🚀 [OxLint](https://oxc.rs/) и [OxFmt](https://oxc.rs/)

### Vue
- 🖖 [Vue](https://vuejs.org/)
- ⚡️ [Vite](https://vitejs.dev/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 📝 [TypeScript](https://www.typescriptlang.org/)
- 🔄 [Vue Router](https://router.vuejs.org/)
- 📦 [Pinia](https://pinia.vuejs.org/)
- 🔧 [Vue DevTools](https://devtools.vuejs.org/)
- 🚀 [OxLint](https://oxc.rs/) и [OxFmt](https://oxc.rs/)

## Структура шаблонов

### React
```
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── oxlintrc.json
├── .oxfmtrc.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    └── pages/
        └── Home.tsx
```

### Vue
```
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── oxlintrc.json
├── .oxfmtrc.json
└── src/
    ├── main.ts
    ├── App.vue
    ├── env.d.ts
    ├── assets/
    │   └── main.css
    ├── router/
    │   └── index.ts
    ├── stores/
    │   └── counter.ts
    └── views/
        └── HomeView.vue
```

## Начало работы

```bash
npx dayme create my-new-project
```

При создании проекта вам будет предложено выбрать:
1. **Пакетный менеджер**: npm или bun
2. **Шаблон**: React или Vue
3. **Git репозиторий**: инициализировать Git репозиторий (по умолчанию включено)

### Поддерживаемые пакетные менеджеры

- **npm** - стандартный пакетный менеджер Node.js
- **bun** - быстрый пакетный менеджер и JavaScript runtime

После создания проекта следуйте инструкциям в терминале для установки зависимостей и запуска проекта.

## Скрипты

### React
| Команда | Описание |
|---------|----------|
| `dev` | Запуск dev-сервера Vite |
| `build` | Сборка проекта (TypeScript + Vite) |
| `preview` | Предпросмотр production-сборки |
| `lint` | Линтинг через OxLint |
| `fmt` | Форматирование через OxFmt |
| `fmt:check` | Проверка форматирования |

### Vue
| Команда | Описание |
|---------|----------|
| `dev` | Запуск dev-сервера Vite |
| `build` | Сборка проекта (type-check + Vite) |
| `preview` | Предпросмотр production-сборки |
| `type-check` | Проверка типов через vue-tsc |
| `lint` | Линтинг через OxLint |
| `fmt` | Форматирование через OxFmt |
| `fmt:check` | Проверка форматирования |

### Git интеграция

Если вы выбрали инициализацию Git репозитория, проект будет автоматически настроен с Git. Вам будет предложено выполнить следующие команды:

```bash
git add .
git commit -m "Initial commit"
```

## Автор

[Dayme](https://daymedead.fun)

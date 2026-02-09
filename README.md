# Finoverse Brand

Веб-портал брендбука Finoverse на React + Vite + Tailwind + shadcn/ui.

## Что внутри

- Единый брендбук с разделами:
  - Introduction
  - Brand Tone
  - Logo
  - Typography
  - Finoverse Events (+ Colors, Illustration, Graphic elements, Resources)
  - Finoverse AI (+ Colors, Illustration, Graphic elements, Resources)
  - Finoverse Ventures (+ Colors, Illustration, Graphic elements, Resources)
  - Motion
  - Social Media
  - Documents
- Фиксированный сайдбар с раскрывающимися подпунктами.
- Темная/светлая тема с сохранением в `localStorage`.
- Виджет Hong Kong time в правом верхнем углу.
- Bottom AI input bar (`Ask Samantha`).
- Интерактивные блоки `Copy` / `Download`.
- Intro hero с видеофоном.

## Стек

- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- shadcn/ui + Radix UI

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть: [http://localhost:5173](http://localhost:5173)

## Проверка и сборка

```bash
npm run lint
npm run build
npm run preview
```

## Где менять контент

- Данные разделов и страниц:
  - `/Users/drunkkraken/brandbook-web/src/data/brandbookData.ts`
- Индексация навигации:
  - `/Users/drunkkraken/brandbook-web/src/data/contentIndex.ts`
- Типы контентных блоков:
  - `/Users/drunkkraken/brandbook-web/src/types.ts`

## Ассеты

- Логотипы / изображения / видео:
  - `/Users/drunkkraken/brandbook-web/public/assets`
- Файлы для скачивания:
  - `/Users/drunkkraken/brandbook-web/public/downloads`

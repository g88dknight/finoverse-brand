# AGENTS

Рабочие правила для этого проекта.

## Технологии

- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui

## Команды

- dev: `npm run dev`
- lint: `npm run lint`
- build: `npm run build`
- preview: `npm run preview`

## Контент и структура

- Основной контент: `src/data/brandbookData.ts`
- Рендер модулей: `src/components/ModuleRenderer.tsx`
- Лейаут и навигация: `src/components/BrandbookLayout.tsx`
- Типы блоков: `src/types.ts`

## Дизайн-конвенции

- Основной шрифт: Geist.
- Стиль: минималистичный, монохромный, аккуратные отступы.
- Секции центрируются на уровне контейнера/заголовков.
- Контент карточек выравнивается по левому краю, если отдельно не запрошено.

## Ассеты

- Бренд-ассеты: `public/assets`
- Download-пакеты: `public/downloads`

## Проверка перед коммитом

1. `npm run lint`
2. `npm run build`

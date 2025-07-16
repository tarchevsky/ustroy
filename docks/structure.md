Страница "Проекты":

- Путь: src/app/projects/page.tsx
- Клиентский компонент: src/components/projects/ProjectPageClient.tsx
- Структура:
  - heroBlock (заголовок, подзаголовок, текст, кнопка)
  - aboutBlock (описание)
  - companies (логотипы заказчиков)
  - ProjectFilters (фильтр по категориям)
  - ProjectGrid (сетка проектов)

Вложенные страницы:

- Категория: src/components/CategoryPage.tsx
  - Хлебные крошки
  - Название, описание
  - Список подкатегорий
  - Сетка проектов (ProjectGrid)
- Пост: src/components/CategoryPostPage.tsx
  - Хлебные крошки
  - Название, категория, год
  - Контент поста
  - ProjectPicturesGrid (галерея)
  - Кнопка обсудить проект
  - Ссылки на другие категории

Маршрутизация вложенных: src/app/[...slug]/page.tsx

---

Блоговые страницы (посты, категории):

- Маршрутизация: src/app/[...slug]/page.tsx (динамический catch-all роут)
- Структура файлов:
  - page.tsx - основной компонент страницы (минимальный код)
  - types.ts - типы для страницы
  - constants.ts - константы (revalidate время)
  - components/
    - PageRenderer.tsx - логика рендеринга страниц по slug
  - utils/
    - metadata.ts - генерация метаданных для SEO
    - staticParams.ts - генерация статических параметров для ISR
- SSR/ISR: данные подгружаются на сервере для SEO и OG, есть кеширование и revalidate
- Компонент поста: src/components/CategoryPostPage.tsx (серверный), внутри — src/components/CategoryPostPageClient.tsx (клиентский, для client-side fetch)
  - Хлебные крошки вынесены в отдельный компонент: src/components/ui/Breadcrumbs.tsx
  - Логика получения данных вынесена в хук: src/components/hooks/useCategoryPostData.ts
- Хлебные крошки, структура ссылок, URL — формируются на основе slug
- При первом заходе: SSR, SEO, OG, кеширование
- При переходе по ссылкам между постами: данные подгружаются на клиенте (SPA-эффект), но сам роут остаётся серверным
- Ограничение Next.js: переход между разными slug (разными постами) всегда вызывает reload страницы, даже если внутри клиентский компонент (архитектурное ограничение app router)
- Если нужен полностью бесшовный переход — только client-side роутинг (но тогда нет SSR/SEO)

---

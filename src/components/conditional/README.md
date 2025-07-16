# ConditionalRenderer

Универсальный компонент для условного рендеринга блоков из WordPress на всех типах страниц.

## Описание

`ConditionalRenderer` автоматически проверяет наличие данных для различных блоков в `typesOfContent` и `pagecontent` и рендерит соответствующие компоненты только при наличии данных.

## Поддерживаемые типы страниц

- ✅ Главная страница (`/`)
- ✅ Страница проектов (`/projects`)
- ✅ Динамические страницы WordPress (`/slug`)
- ✅ Страницы категорий (`/category-slug`)
- ✅ Страницы подкатегорий (`/parent-category/subcategory`)
- ✅ Страницы постов (`/category/subcategory/post-slug`)

## Использование

```tsx
import { ConditionalRenderer } from '@/components/conditional/ConditionalRenderer'

// На любой странице
;<ConditionalRenderer
  typesOfContent={typesOfContent}
  pagecontent={pagecontent}
/>
```

## Поддерживаемые блоки

### Companies (Заказчики)

- **Источник данных**: `typesOfContent.choose` с `fieldGroupName === 'TypesOfContentChooseCustomersLayout'`
- **Альтернативный источник**: `pagecontent.companies`
- **Компонент**: `Companies`

## Добавление новых блоков

Для добавления нового блока:

1. Создайте компонент для блока в `ConditionalRenderer.tsx`:

```tsx
const ConditionalHero = ({ typesOfContent }: ConditionalRendererProps) => {
  const heroBlock = typesOfContent?.choose?.find(
    (item: any) => item.fieldGroupName === 'TypesOfContentChooseHeroLayout',
  )

  if (!heroBlock) return null

  return <Hero {...heroBlock} />
}
```

2. Добавьте вызов в основной компонент:

```tsx
export const ConditionalRenderer = ({
  typesOfContent,
  pagecontent,
}: ConditionalRendererProps) => {
  return (
    <>
      <ConditionalCompanies
        typesOfContent={typesOfContent}
        pagecontent={pagecontent}
      />
      <ConditionalHero typesOfContent={typesOfContent} />
      {/* Другие блоки */}
    </>
  )
}
```

## Преимущества

- **Универсальность**: Работает на всех типах страниц (главная, проекты, блог, динамические страницы)
- **Автоматизация**: Не требует ручной проверки наличия данных
- **Расширяемость**: Легко добавлять новые типы блоков
- **Консистентность**: Единообразное поведение на всех страницах
- **Адаптивность**: Автоматически адаптируется между разными шаблонами

## Техническая реализация

Компонент проверяет два источника данных:

1. `typesOfContent.choose` - блоки из WordPress ACF
2. `pagecontent` - стандартные поля страницы

Приоритет отдается `typesOfContent`, затем `pagecontent`.

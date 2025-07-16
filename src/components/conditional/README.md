# ConditionalRenderer

Универсальный компонент для условного рендеринга блоков из WordPress на всех типах страниц.

## Описание

`ConditionalRenderer` автоматически проверяет наличие данных для различных блоков в `typesOfContent` и `pagecontent` и рендерит соответствующие компоненты только при наличии данных. **Компоненты выводятся в том же порядке, в котором они добавлены в WordPress ACF Flexible Content.**

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

### TextWithButton (Кнопка с текстом)

- **Источник данных**: `typesOfContent.choose` с `fieldGroupName === 'TypesOfContentChooseCalculateLayout'`
- **Компонент**: `TextWithButton`
- **Поля**: `text`, `btnText`

## Порядок рендеринга

Компоненты рендерятся в том же порядке, в котором они добавлены в WordPress ACF Flexible Content:

1. **Приоритет typesOfContent**: Сначала рендерятся все блоки из `typesOfContent.choose` в порядке их добавления
2. **Fallback pagecontent**: Если Companies блок не найден в `typesOfContent`, но есть в `pagecontent` - рендерится в конце

## Добавление новых блоков

Для добавления нового блока:

1. Добавьте новый case в switch в `ConditionalRenderer`:

```tsx
export const ConditionalRenderer = ({
  typesOfContent,
  pagecontent,
}: ConditionalRendererProps) => {
  return (
    <>
      {typesOfContent.choose.map((block, index) => {
        switch (block.fieldGroupName) {
          case 'TypesOfContentChooseCustomersLayout':
            return (
              <ConditionalCompanies
                key={index}
                block={block}
                pagecontent={pagecontent}
              />
            )
          case 'TypesOfContentChooseCalculateLayout':
            return <ConditionalTextWithButton key={index} block={block} />
          case 'TypesOfContentChooseHeroLayout':
            return <ConditionalHero key={index} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
```

2. Создайте компонент для блока:

```tsx
const ConditionalHero = ({ block }: { block: any }) => {
  if (!block) return null
  return <Hero {...block} />
}
```

## Преимущества

- **Универсальность**: Работает на всех типах страниц (главная, проекты, блог, динамические страницы)
- **Автоматизация**: Не требует ручной проверки наличия данных
- **Расширяемость**: Легко добавлять новые типы блоков
- **Консистентность**: Единообразное поведение на всех страницах
- **Адаптивность**: Автоматически адаптируется между разными шаблонами
- **Порядок**: Сохраняет порядок блоков из WordPress ACF Flexible Content

## Техническая реализация

Компонент использует `map` для итерации по блокам `typesOfContent.choose` в порядке их добавления в WordPress. Каждый блок обрабатывается через `switch` по `fieldGroupName`.

Приоритет источников данных:

1. `typesOfContent.choose` - блоки из WordPress ACF (в порядке добавления)
2. `pagecontent` - стандартные поля страницы (fallback)

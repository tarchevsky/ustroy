import FadeIn from '../fadeIn/FadeIn'

const DESKTOP_WIDTH = 1205
const RECT_WIDTH = 290
const IMG_WIDTH = 897
const GAP = 16
const RECT_PERC = (RECT_WIDTH / (DESKTOP_WIDTH - GAP)) * 100 // ~24.5%
const IMG_PERC = (IMG_WIDTH / (DESKTOP_WIDTH - GAP)) * 100 // ~75.5%

const headingClamp = 'clamp(1rem, 2vw, 1.25rem)' // 16px-20px
const headingClampLg = 'clamp(1.125rem, 2.5vw, 1.5rem)' // 18px-24px
const subtitleClamp = 'clamp(0.875rem, 1.5vw, 1rem)' // 14px-16px

const AboutBlock = ({ block }: { block: any }) => {
  if (!block || !block.grid || block.grid.length < 3) return null

  return (
    <FadeIn>
      <section className="cont ind box-border">
        <h2 className="uppercase text-[32px] font-medium mb-2 box-border">
          О компании
        </h2>
        <h4 className="text-lg mb-8 box-border">в фото</h4>
        {/* Мобильный макет до md */}
        <div className="flex flex-col gap-2 md:hidden box-border">
          {/* 1 строка */}
          <img
            src={block.grid[0].img.node.sourceUrl}
            alt={block.grid[0].img.node.altText}
            className="w-full h-[259px] object-cover box-border rounded-box"
          />
          <div className="flex flex-col justify-between w-full h-[259px] bg-white p-4 shadow-none box-border rounded-box">
            <div className="text-xl font-semibold mb-2 text-left box-border">
              {block.grid[0].heading}
            </div>
            <div className="text-base text-gray-500 mt-auto text-left box-border">
              {block.grid[0].subtitle}
            </div>
          </div>
          {/* 2 строка: две картинки в строку */}
          <div className="flex flex-row gap-2 w-full">
            {block.grid[1].imgMiniOne && (
              <img
                src={block.grid[1].imgMiniOne.node.sourceUrl}
                alt={block.grid[1].imgMiniOne.node.altText}
                className="w-1/2 h-[200px] object-cover box-border rounded-box"
              />
            )}
            {block.grid[1].imgMiniTwo && (
              <img
                src={block.grid[1].imgMiniTwo.node.sourceUrl}
                alt={block.grid[1].imgMiniTwo.node.altText}
                className="w-1/2 h-[200px] object-cover box-border rounded-box"
              />
            )}
          </div>
          {/* Картинка на всю ширину */}
          <img
            src={block.grid[1].img.node.sourceUrl}
            alt={block.grid[1].img.node.altText}
            className="w-full h-[259px] object-cover box-border rounded-box"
          />
          {/* Прямоугольник с текстом на всю ширину */}
          <div className="flex flex-col justify-between w-full h-[259px] bg-white p-4 shadow-none box-border rounded-box">
            <div className="text-lg font-bold mb-2 text-left box-border">
              {block.grid[1].heading}
            </div>
            <div className="text-sm text-gray-500 mt-auto text-left box-border">
              {block.grid[1].subtitle}
            </div>
          </div>
          {/* 3 строка: картинка, потом прямоугольник с текстом */}
          <img
            src={block.grid[2].img.node.sourceUrl}
            alt={block.grid[2].img.node.altText}
            className="w-full h-[259px] object-cover box-border rounded-box"
          />
          <div className="flex flex-col justify-between w-full h-[259px] bg-white p-4 shadow-none box-border rounded-box">
            <div className="text-xl font-semibold mb-2 text-left box-border">
              {block.grid[2].heading}
            </div>
            <div className="text-base text-gray-500 mt-auto text-left box-border">
              {block.grid[2].subtitle}
            </div>
          </div>
        </div>
        {/* Десктопный макет с md, резиновый */}
        <div className="hidden md:flex flex-col gap-8 box-border">
          {/* Первая строка: прямоугольник и картинка справа, gap только между элементами */}
          <div className="flex flex-row gap-4 box-border">
            {/* Прямоугольник с текстом */}
            <div
              className="flex flex-col justify-between bg-white p-6 shadow-none box-border rounded-box"
              style={{ width: `calc(${RECT_PERC}% )`, aspectRatio: '290/395' }}
            >
              <div
                className="font-semibold mb-2 text-left box-border"
                style={{ fontSize: headingClamp }}
              >
                {block.grid[0].heading}
              </div>
              <div
                className="text-gray-500 mt-auto text-left box-border"
                style={{ fontSize: subtitleClamp }}
              >
                {block.grid[0].subtitle}
              </div>
            </div>
            {/* Картинка */}
            <img
              src={block.grid[0].img.node.sourceUrl}
              alt={block.grid[0].img.node.altText}
              className="object-cover box-border rounded-box"
              style={{
                width: `calc(${IMG_PERC}% )`,
                aspectRatio: '897/395.47',
              }}
            />
          </div>
          {/* Вторая строка: две картинки в колонку, прямоугольник с текстом, большая картинка */}
          <div className="flex flex-row gap-4 box-border">
            {/* Колонка с двумя картинками */}
            <div
              className="flex flex-col gap-4 box-border"
              style={{ width: `calc(${RECT_PERC}% )` }}
            >
              {block.grid[1].imgMiniOne && (
                <img
                  src={block.grid[1].imgMiniOne.node.sourceUrl}
                  alt={block.grid[1].imgMiniOne.node.altText}
                  className="object-cover box-border rounded-box"
                  style={{ width: '100%', aspectRatio: '290/264' }}
                />
              )}
              {block.grid[1].imgMiniTwo && (
                <img
                  src={block.grid[1].imgMiniTwo.node.sourceUrl}
                  alt={block.grid[1].imgMiniTwo.node.altText}
                  className="object-cover box-border rounded-box"
                  style={{ width: '100%', aspectRatio: '290/264' }}
                />
              )}
            </div>
            {/* Прямоугольник с текстом */}
            <div
              className="flex flex-col justify-between bg-white p-6 shadow-none box-border rounded-box"
              style={{ width: `calc(${RECT_PERC}% )`, aspectRatio: '290/544' }}
            >
              <div
                className="font-bold mb-2 text-left box-border"
                style={{ fontSize: headingClamp }}
              >
                {block.grid[1].heading}
              </div>
              <div
                className="text-gray-500 mt-auto text-left box-border"
                style={{ fontSize: subtitleClamp }}
              >
                {block.grid[1].subtitle}
              </div>
            </div>
            {/* Большая картинка */}
            <img
              src={block.grid[1].img.node.sourceUrl}
              alt={block.grid[1].img.node.altText}
              className="object-cover box-border rounded-box"
              style={{
                width: `calc(100% - 2*${RECT_PERC}% - 2*${GAP}px)`,
                aspectRatio: '592/542',
              }}
            />
          </div>
          {/* Третья строка: картинка слева, прямоугольник, gap только между элементами */}
          <div className="flex flex-row gap-4 box-border">
            {/* Картинка */}
            <img
              src={block.grid[2].img.node.sourceUrl}
              alt={block.grid[2].img.node.altText}
              className="object-cover box-border rounded-box"
              style={{
                width: `calc(${IMG_PERC}% )`,
                aspectRatio: '897/395.47',
              }}
            />
            {/* Прямоугольник с текстом */}
            <div
              className="flex flex-col justify-between bg-white p-6 shadow-none box-border rounded-box"
              style={{ width: `calc(${RECT_PERC}% )`, aspectRatio: '290/395' }}
            >
              <div
                className="font-semibold mb-2 text-left box-border"
                style={{ fontSize: headingClamp }}
              >
                {block.grid[2].heading}
              </div>
              <div
                className="text-base text-gray-500 mt-auto text-left box-border"
                style={{ fontSize: subtitleClamp }}
              >
                {block.grid[2].subtitle}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

export default AboutBlock

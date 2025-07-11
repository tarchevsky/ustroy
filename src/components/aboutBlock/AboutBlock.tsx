const AboutBlock = ({ block }: { block: any }) => (
  <section className="cont ind">
    <div className="grid gap-8 md:grid-cols-3">
      {block.grid?.map((gridItem: any, index: number) => (
        <div key={index} className="card shadow-xl">
          {gridItem.img && (
            <figure>
              <img
                src={gridItem.img.node.sourceUrl}
                alt={gridItem.img.node.altText}
                className="w-full h-48 object-cover"
              />
            </figure>
          )}
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-2">{gridItem.heading}</h2>
            {(gridItem.imgMiniOne || gridItem.imgMiniTwo) && (
              <div className="flex gap-2 justify-center mb-2">
                {gridItem.imgMiniOne && (
                  <img
                    src={gridItem.imgMiniOne.node.sourceUrl}
                    alt={gridItem.imgMiniOne.node.altText}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                {gridItem.imgMiniTwo && (
                  <img
                    src={gridItem.imgMiniTwo.node.sourceUrl}
                    alt={gridItem.imgMiniTwo.node.altText}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
              </div>
            )}
            {gridItem.subtitle && (
              <p className="text-sm">{gridItem.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default AboutBlock

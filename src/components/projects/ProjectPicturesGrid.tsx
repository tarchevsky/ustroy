import React from 'react'

interface ProjectPicturesGridProps {
  img1?: { node: { sourceUrl: string; altText?: string } }
  img2?: { node: { sourceUrl: string; altText?: string } }
  img3?: { node: { sourceUrl: string; altText?: string } }
  img4?: { node: { sourceUrl: string; altText?: string } }
}

const ProjectPicturesGrid: React.FC<ProjectPicturesGridProps> = ({
  img1,
  img2,
  img3,
  img4,
}) => {
  return (
    <section className="ind w-full my-8">
      {/* Мобильная сетка (до md): одна колонка, gap-2, нужные aspect-ratio */}
      <div className="flex flex-col gap-2 md:hidden">
        {/* img1 — высокая */}
        {img1?.node?.sourceUrl && (
          <div className="w-full aspect-[328/375] rounded-box overflow-hidden">
            <img
              src={img1.node.sourceUrl}
              alt={img1.node.altText || ''}
              className="object-cover w-full h-full rounded-box"
            />
          </div>
        )}
        {/* img2 — низкая */}
        {img2?.node?.sourceUrl && (
          <div className="w-full aspect-[328/255] rounded-box overflow-hidden">
            <img
              src={img2.node.sourceUrl}
              alt={img2.node.altText || ''}
              className="object-cover w-full h-full rounded-box object-bottom"
            />
          </div>
        )}
        {/* img3 — высокая (третьей) */}
        {img3?.node?.sourceUrl && (
          <div className="w-full aspect-[328/375] rounded-box overflow-hidden">
            <img
              src={img3.node.sourceUrl}
              alt={img3.node.altText || ''}
              className="object-cover w-full h-full rounded-box"
            />
          </div>
        )}
        {/* img4 — низкая */}
        {img4?.node?.sourceUrl && (
          <div className="w-full aspect-[328/255] rounded-box overflow-hidden">
            <img
              src={img4.node.sourceUrl}
              alt={img4.node.altText || ''}
              className="object-cover w-full h-full rounded-box"
            />
          </div>
        )}
      </div>
      {/* Десктопная сетка (от md): прежний вид */}
      <div className="hidden md:grid grid-cols-2 gap-5">
        {/* Левая колонка */}
        <div className="flex flex-col gap-5">
          {/* img1 — высокая */}
          {img1?.node?.sourceUrl && (
            <div className="w-full aspect-[592/797] rounded-box overflow-hidden">
              <img
                src={img1.node.sourceUrl}
                alt={img1.node.altText || ''}
                className="object-cover w-full h-full rounded-box"
              />
            </div>
          )}
          {/* img4 — низкая */}
          {img4?.node?.sourceUrl && (
            <div className="w-full aspect-[592/464] rounded-box overflow-hidden">
              <img
                src={img4.node.sourceUrl}
                alt={img4.node.altText || ''}
                className="object-cover w-full h-full rounded-box"
              />
            </div>
          )}
        </div>
        {/* Правая колонка */}
        <div className="flex flex-col gap-5">
          {/* img2 — низкая */}
          {img2?.node?.sourceUrl && (
            <div className="w-full aspect-[592/466] rounded-box overflow-hidden">
              <img
                src={img2.node.sourceUrl}
                alt={img2.node.altText || ''}
                className="object-cover w-full h-full rounded-box object-bottom"
              />
            </div>
          )}
          {/* img3 — высокая */}
          {img3?.node?.sourceUrl && (
            <div className="w-full aspect-[592/797] rounded-box overflow-hidden">
              <img
                src={img3.node.sourceUrl}
                alt={img3.node.altText || ''}
                className="object-cover w-full h-full rounded-box"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectPicturesGrid

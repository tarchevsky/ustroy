'use client'

const FooterUp = () => (
  <button
    type="button"
    className="border-black border-t-[1px] pt-4 bg-transparent cursor-pointer"
    style={{ fontFamily: 'Commissioner Variable, sans-serif' }}
    onClick={() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }}
  >
    Наверх
  </button>
)

export default FooterUp

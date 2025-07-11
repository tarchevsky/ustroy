import { BurgerProps } from '@/types'
import { useState } from 'react'

const Burger = ({ toggleMenu }: BurgerProps) => {
  const [isActive, setIsActive] = useState(false)

  const toggleIsActive = () => {
    setIsActive((prev) => !prev)
    toggleMenu()
  }

  return (
    <label className="swap swap-rotate block md:hidden absolute inset-y-8 right-14 sm:right-20 cursor-pointer z-20 p-0 bg-transparent border-0 shadow-none">
      <input
        type="checkbox"
        checked={isActive}
        onChange={toggleIsActive}
        aria-label="Open the menu"
        className="hidden"
      />
      {/* burger icon (закрыто) */}
      <svg
        className="swap-off fill-current absolute inset-0"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="10" x="2" width="32" height="3" rx="1.5" fill="#393939" />
        <rect y="16" x="3" width="25" height="3" rx="1.5" fill="#393939" />
        <rect y="22" x="2" width="32" height="3" rx="1.5" fill="#393939" />
      </svg>
      {/* close icon (открыто) */}
      <svg
        className="swap-on fill-current absolute inset-0"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="7"
          y1="7"
          x2="28"
          y2="28"
          stroke="#BDBDBD"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="7"
          x2="7"
          y2="28"
          stroke="#BDBDBD"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </label>
  )
}

export default Burger

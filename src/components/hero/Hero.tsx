import { HeroProps } from '@/types'
import Image from 'next/image'
import FadeIn from '../fadeIn/FadeIn'

const Hero = ({
  title,
  subtitle,
  buttonText,
  src,
  alt,
  text1,
  text2,
}: HeroProps) => {
  return (
    <main className="cont ind">
      <FadeIn>
        <div className="flex flex-col gap-4">
          {title ? (
            <h1 className="font-medium uppercase mt-[72px]">
              {title}{' '}
              {subtitle && (
                <span className="text-[32px]">
                  <br />
                  {subtitle}
                </span>
              )}
            </h1>
          ) : (
            ''
          )}
          <div className="flex justify-between gap-8 flex-col md:grid md:grid-cols-[auto_1fr] md:gap-16 lg:gap-[115px] flex-wrap sm:flex-nowrap">
            {buttonText ? (
              <button className="col-span-1 btn btn-lg btn-block md:btn-wide font-medium text-base-100 btn-primary hover:bg-base-100 hover:text-primary hover:border-primary hover:border-2">
                {buttonText}
              </button>
            ) : (
              ''
            )}
            <div className="col-span-auto flex flex-col md:flex-row gap-6 md:gap-14">
              {text1 && (
                <p className="border-t-[1px] border-black pt-2">{text1}</p>
              )}
              {text2 && (
                <p className="border-t-[1px] border-black pt-2">{text2}</p>
              )}
            </div>
          </div>
        </div>
        {src && (
          <Image
            className="w-full md:w-[800px] rounded-box shadow-2xl brightness-[0.7]"
            src={src}
            alt={alt || 'Картинка без описания'}
            priority
            width={600}
            height={600}
          />
        )}
      </FadeIn>
    </main>
  )
}

export default Hero

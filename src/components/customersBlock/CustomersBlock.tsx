import { TypesOfContentChooseCustomersLayout } from '@/graphql/types/pageSettingsTypes'
import Image from 'next/image'

interface CustomersBlockProps {
  block: TypesOfContentChooseCustomersLayout
}

const CustomersBlock = ({ block }: CustomersBlockProps) => {
  return (
    <div className="cont">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {block.repeater.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            {item.kartinka?.node && (
              <Image
                src={item.kartinka.node.uri}
                alt={item.kartinka.node.altText || 'Логотип клиента'}
                width={150}
                height={80}
                className="object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomersBlock

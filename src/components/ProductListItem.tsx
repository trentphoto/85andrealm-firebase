import Image from 'next/image'
import React from 'react'
import { Product } from '@/types/types'
import Link from 'next/link'

export default function ProductListItem({ product }: { product: Product }) {
    
    const { name, id, description, price, image_url} = product

    return (
        <Link href={`/product/${id}`} key={id} className="relative w-full overflow-hidden flex flex-col sm:flex-row bg-white border-2 p-8 gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="overflow-hidden w-60 h-60 max-w-full">
                <Image src={image_url ? image_url : "/svg/blank.svg"} alt={name} width={100} height={100} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col items-start justify-start gap-2">
                <h3 className="h4">{name}</h3>
                {/* pink divider line  */}
                <div className="block w-10 h-0.5 bg-pink-400 transition-transform origin-left duration-500 ease-in-out group-hover:scale-x-[250%]" />
                <p>{description}</p>
                <div className="font-bold">{price}</div>
                <div className='px-12 py-3 text-sm bg-transparent border border-gray-900 group-hover:bg-gray-900 active:bg-gray-800 group-hover:text-white transition duration-300'>View Details</div>
            </div>
        </Link>
    )
}

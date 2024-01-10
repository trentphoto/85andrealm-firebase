import ItemCard from './ItemCard'
import { Product } from '@/types/types'
import clsx from 'clsx'
import { useState } from 'react'

const featuredCategories = [
    { id: 1, name: 'Wedding', },
    { id: 10, name: 'Holiday', },
    { id: 9, name: 'Spring', },
    { id: 3, name: 'Roses', },
    { id: 8, name: 'Plants', },
]


export default function BrowseByCategorySection({ products }: { products: Product[] }) {

    const [selectedCategory, setSelectedCategory] = useState(1)

    const productsToShow = products.filter(product => product.category_id === selectedCategory).splice(0, 4)

    const handleCategoryClick = (id: number) => {
        setSelectedCategory(id)
    }
    return (
        <section className="px-4 p-4 py-24">
            <div className="container">
                <h2 className='text-center mb-8'>Browse by Category</h2>
                <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                    {
                        featuredCategories.map(category => (
                            <div key={category.id} onClick={() => handleCategoryClick(category.id)} className={clsx(
                                'underlineEffect cursor-pointer p-2',
                                selectedCategory === category.id ? 'after:scale-x-100' : ''
                            )}>{category.name}</div>
                        ))
                    }
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {
                    products ? productsToShow.map((product) => (
                        <ItemCard key={product.id} product={product} />
                    )) : ''
                }
                </div>
            </div>
        </section>
    )
}

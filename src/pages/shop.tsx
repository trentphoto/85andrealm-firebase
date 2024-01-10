import ButtonLink from "@/components/ButtonLink";
import ProductListItem from "@/components/ProductListItem";
import SidebarCategoryItem from "@/components/SidebarCategoryItem";
import Layout from "@/components/layout/Layout";
import Section from "@/components/layout/Section";
import { fetchCategories, fetchProducts } from "@/lib/fetchFunctions";
import { Category, Product } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

export default function ShopPage({ products, categories }: { products: Product[], categories: Category[] }) {
    
    const [checkedCategories, setCheckedCategories] = useState<number[]>([]);

    const [sortMethod, setSortMethod] = useState<string>('featured');

    const handleCategoryChange = (id: number) => {
        // check if the category is already in the array
        if (checkedCategories.includes(id)) {
            // if so, remove it
            setCheckedCategories((prevCategories) => prevCategories.filter(category => category !== id));
        } else {
            // if not, add it
            setCheckedCategories(prevCategories => [...prevCategories, id]);
        }
    }

    const clearCategories = () => {
        setCheckedCategories([]);
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortMethod(e.target.value);
    }

    const productsToShow = products.filter(prod => {
        // if there are no checked categories, show all products
        if (checkedCategories.length === 0) {
            return true;
        }
        // if there are checked categories, only show products that match the checked categories
        return checkedCategories.includes(prod.category_id);
    }).sort((a, b) => {
        // sort the products based on the sort method
        if (sortMethod === 'featured') {
            return 0;
        } else if (sortMethod === 'lowToHigh') {
            return a.price - b.price;
        } else if (sortMethod === 'highToLow') {
            return b.price - a.price;
        }
        return 0;
    });

    return (
        <>
            <Layout>
                {/* hero jumbo card */}
                <Section className="py-4 relative">
                    <div className="absolute w-full h-1/2 bottom-0 right-0 left-0 bg-blue-50" />
                    <div className="container">

                        {/* hero display ad style */}
                        <div className="col-span-3 md:col-span-2 relative overflow-hidden">
                            <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 bg-white/75 z-10 sm:hidden" />
                            <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                                <Image 
                                    src="https://res.cloudinary.com/dakfmjumy/image/upload/v1680999775/realm/site/lavender_tu2ur8.jpg" 
                                    alt="lavender" 
                                    width={1800} 
                                    height={600} 
                                    className='w-full h-full object-cover' 
                                    priority
                                />
                            </div>
                            <div className="relative p-8 py-20 sm:grid grid-cols-2">
                                <div></div>
                                <div className='ml-8 relative z-20'>
                                    <h2 className='h1'>Lavender Collections</h2>
                                    <p className="smallcaps">Up to 20% off</p>
                                    <ButtonLink href="/shop" className="mt-6">Browse Now</ButtonLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* main products list */}
                <Section className="pb-12 bg-blue-50">
                    <div className="container py-16 flex gap-4 justify-between">
                        <p>Showing {productsToShow.length.toString()} results</p>
                        <select className="p-3" name="test1" id="test1" onChange={handleSortChange}>
                            <option value="featured">Featured</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="container md:grid grid-cols-4 gap-4">

                        <div className="col-span-1">
                            <div className="bg-white border-2 p-4 relative mb-12">
                                <h2 className="text-2xl font-bold mb-4">Filter</h2>
                                <div className="absolute top-4 right-4 underline text-gray-500 cursor-pointer" onClick={clearCategories}>Reset</div>
                                <div className="flex flex-col gap-2">
                                    {
                                        categories ? categories.map(category => (
                                            <SidebarCategoryItem onItemClick={handleCategoryChange} isActive={checkedCategories.includes(category.id)} key={category.id} category={category} />
                                        )) : ''
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3">
                            <div className="flex flex-col gap-4">
                                
                                {
                                    productsToShow ? (
                                        productsToShow.map((item: Product) => ( <ProductListItem key={item.id} product={item} /> ))
                                    ) : ''
                                }

                            </div>
                            
                            
                        </div>
                    </div>
                </Section>

            </Layout>
        </>
    )
    }
    export const getServerSideProps = async (context: any) => {
        const baseUrl = context.req ? `http://${context.req.headers.host}` : '';
        const products = await fetchProducts(baseUrl);
        const categories = await fetchCategories(baseUrl)

        return {
            props: {
                products,
                categories
            },
        };
}

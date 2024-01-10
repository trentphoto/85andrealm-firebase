import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/Layout'
import ButtonLink from '@/components/ButtonLink'
import { fetchCategories, fetchPosts, fetchProducts, fetchTestimonials } from '@/lib/fetchFunctions'
import { BlogPost, Product, Testimonial } from '@/types/types'
import ItemCard from '@/components/ItemCard'
import BrowseByCategorySection from '@/components/BrowseByCategorySection'
import BlogCard from '@/components/BlogCard'
import Section from '@/components/layout/Section'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ products, testimonial, posts }: { products: Product[], testimonial: Testimonial, posts: BlogPost[] }) {

  // data
  const newArrivals = products.filter(product => product.category_id === 2).splice(0, 4);
  const weddingFeatured = products.filter(product => product.category_id === 1).splice(0, 4);

  // components

  const HomeHero = () => (
    <>
        <section className="relative w-full h-[calc(100vh-122px)] overflow-hidden p-4">
            <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <Image 
                src="https://res.cloudinary.com/dakfmjumy/image/upload/v1680994843/realm/site/home-hero-small_1_eqaswy.jpg" 
                alt="hero" 
                width={1800} 
                height={1200} 
                className='w-full h-full object-cover -scale-x-100 md:scale-x-100' 
                priority
              />
            </div>
            <div className="relative container">
                <div className="h-screen grid md:grid-cols-2">
                  <div className='hidden md:block' />
                  <div className="flex flex-col items-start justify-start mt-40">
                    <div className="smallcaps text-md mt-4">A Perfect Bouquet</div>
                    <h1 className="text-6xl xl:text-8xl">New Collections</h1>
                    <div className="font-bold text-md mt-4">Explore Our Finest Floral Arrangements.</div>
                    <ButtonLink href="/shop" className="mt-6">Shop Now</ButtonLink>
                  </div>
                </div>
            </div>
        </section>
    </>
  )

  return (
    <Layout>
      <HomeHero />
      <Section className="p-4 py-24">
        <div className="container grid grid-cols-3 gap-4 mb-4">

          {/* card 1 */}
          <div className="col-span-3 md:col-span-2 relative overflow-hidden">
            <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <Image src="https://res.cloudinary.com/dakfmjumy/image/upload/v1680999775/realm/site/lavender_tu2ur8.jpg" alt="lavender" width={1800} height={600} className='w-full h-full object-cover' />
            </div>
            <div className="relative p-8 py-20 grid grid-cols-2">
              <div></div>
              <div className='ml-8'>
                <h2 className='h3'>Lavender Collections</h2>
                <p className="smallcaps">Up to 20% off</p>
                <ButtonLink href="/shop" className="mt-6">Browse Now</ButtonLink>
              </div>
            </div>
          </div>

          {/* card 2: square card, image background, no text */}
          <div className="relative overflow-hidden hidden md:block">
            <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <Image src="https://res.cloudinary.com/dakfmjumy/image/upload/v1681001215/realm/site/flowers1_mmvbxm.jpg" alt="flowers background" width={1800} height={1800} className='w-full h-full object-cover' />
            </div>
          </div>
        </div>

        {/* row 2 */}

        <div className="container grid grid-cols-3 gap-4 mb-4">

          {/* card 1: square card */}
          <div className="relative overflow-hidden hidden md:block">
            <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <Image src="https://res.cloudinary.com/dakfmjumy/image/upload/v1681002736/realm/site/tulip1_dtbk0c.jpg" alt="flowers background" width={1800} height={1800} className='w-full h-full object-cover' />
            </div>
            <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 bg-white/75" />
            <div className="relative p-8 h-full flex flex-col items-center justify-center gap-3">
              <h2 className=''>Tulips</h2>
              <p className="italic">Browse Now</p>
            </div>

          </div>

          {/* card 2 */}
          <div className="col-span-3 md:col-span-2 relative overflow-hidden">
            <div className="absolute w-full h-full top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <Image src="https://res.cloudinary.com/dakfmjumy/image/upload/v1681002636/realm/site/peony_phigwm.jpg" alt="lavender" width={1800} height={600} className='w-full h-full object-cover' />
            </div>
            <div className="relative p-8 py-20 grid grid-cols-2">
              <div></div>
              <div className=''>
                <p className="smallcaps">Up to 10% off</p>
                <h2 className='h3'>Happy Mother&#39;s Day</h2>
                <ButtonLink href="/shop" className="mt-6">Explore Collection</ButtonLink>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <BrowseByCategorySection products={products} />

      <Section className="p-4 py-24 relative">
        <div className="absolute w-full h-full lg:h-1/2 top-0 right-0 left-0 bg-blue-100" />
        <div className="container relative">
          <h2 className='text-center mb-8'>Newest Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {
              newArrivals.map((product) => (
                <ItemCard key={product.id} product={product} />
              ))
            }
          </div>
        </div>
      </Section>

      <Section className="py-24 relative">
        <div className="container">
          <h2 className='text-center mb-8'>From the Blog</h2>
          <div className="block sm:grid grid-cols-2 lg:grid-cols-3 gap-3">
            {
              posts ? (
                posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                )) 
              ) : '' 
            }
          </div>
        </div>
      </Section>

      <Section className="py-24 relative">
        <div className="container">
          <h2 className='text-center mb-8'>What People Are Saying</h2>
          
          {/* testimonial */}
          {
            testimonial ? (
              <div className="mx-auto flex flex-col items-center gap-2 text-center max-w-xl">
                <p>{testimonial.testimonial}</p>
                <div className="w-24 h-24">
                  <Image src={testimonial.image_url} alt="testimonial" width={100} height={100} className='w-full h-full object-cover rounded-full' />
                </div>
                <p><span className='font-bold'>{testimonial.customer_name}</span>, customer</p>
              </div>
            ) : ''
          }

        </div>
      </Section>
      
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {

  const baseUrl = context.req ? `http://${context.req.headers.host}` : '';

  const products = await fetchProducts(baseUrl);

  const categories = await fetchCategories(baseUrl);
  
  const posts = (await fetchPosts(baseUrl)).splice(0, 3);

  const testimonials = await fetchTestimonials(baseUrl);

  // select a random testimonial
  const testimonial = testimonials[Math.floor(Math.random() * testimonials.length)];

  return {
      props: {
          products,
          categories,
          testimonial,
          posts,
      },
  };
}
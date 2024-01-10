import BlogCard from "@/components/BlogCard";
import Layout from "@/components/layout/Layout";
import { fetchPosts } from "@/lib/fetchFunctions";
import { BlogPost } from "@/types/types";

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  return (
    <>
        <Layout>
            {/* blog grid  */}
            <section className="p-4 py-24 relative">
                <div className="container">
                <h1 className='h0 text-center mb-16'>Latest Articles</h1>
                <div className="flex flex-col sm:grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {
                        posts ? (
                            posts.map((post: BlogPost) => ( <BlogCard key={post.id} post={post} /> ))
                        ) : ''
                    }
                </div>
                </div>
            </section>
        </Layout>
    </>
  )
}
export const getServerSideProps = async (context: any) => {
  const baseUrl = context.req ? `http://${context.req.headers.host}` : '';
  const posts = await fetchPosts(baseUrl);

  return {
      props: {
        posts,
      },
  };
}
import BlogCard from "@/components/BlogCard";
import Layout from "@/components/layout/Layout";
import Section from "@/components/layout/Section";
import { fetchPost, fetchPosts } from "@/lib/fetchFunctions";
import { BlogPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaCaretLeft, FaPenSquare } from "react-icons/fa";

export default function BlogSingle({ post, posts }: { post: BlogPost, posts: BlogPost[] }) {

  // date 30 days ago
  const date = new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <Layout>
      <Section className="py-20 px-8">

        {/* back button */}
        <div className="container">
          <Link href='/blog' className="inline-flex items-center gap-2 px-6 py-3 mb-12 -ml-12 rounded-full cursor-pointer hover:bg-gray-50">
              <FaCaretLeft className="text-2xl text-gray-400 hover:text-gray-500" />
              <span className="smallcaps text-sm text-gray-500">Back to All Posts</span>
            </Link>
        </div>

        <div className="container">

          {/* jumbo featured image */}
          {
            post.image_url ? (
              <div className="relative w-full h-96 mb-24
              after:content-[''] after:absolute after:block after:top-0 after:left-0 after:w-full after:h-full after:border-2 after:border-black after:-z-10 after:translate-y-4 after:translate-x-4
              before:content-[''] before:absolute before:block before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-black before:-z-10 before:-translate-y-4 before:-translate-x-4
              ">
                <Image 
                  src={post.image_url} 
                  alt={post.title} 
                  width={700}
                  height={300}
                  className="w-full h-full object-cover relative" 
                  priority 
                  />
              </div>
            ) : ''
          }

          <h1 className="md:text-center">{post.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full md:justify-center py-8">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-xl text-gray-400 shrink-0" />
              <span className="smallcaps text-gray-500">{ date }</span>
            </div>
            
            {/* divider */}
            <div className="hidden md:block h-6 w-0.5 bg-gray-400" />

            <div className="flex items-center gap-2">
              <FaPenSquare className="text-xl text-gray-400 shrink-0" />
              <span className="smallcaps text-gray-500">By {post.author}</span>
            </div>
          </div>

          <div className="mx-auto max-w-3xl text-lg">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </Section>

      {/* more posts */}
      <Section className="py-24 bg-gray-50">
          <div className="container">
              <h2 className='text-center mb-12'>More Posts</h2>
              <div className="grid md:grid-cols-3 gap-3">
              {
                posts ? (
                  posts.filter((featuredPost => featuredPost.id !== post.id)).splice(0,3).map((featuredPost) => (
                    <BlogCard key={featuredPost.id} post={featuredPost} />
                  )) 
                ) : '' 
              }
              </div>
          </div>
      </Section>
    </Layout>
  )
}
export async function getServerSideProps(context: any) {
  const baseUrl = context.req ? `http://${context.req.headers.host}` : '';
  const postId = context.query.id;
  const post = await fetchPost(baseUrl, postId); 
  const posts = (await fetchPosts(baseUrl));
  return { props: { post, posts } };
}

import { BlogPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaPenSquare } from "react-icons/fa";

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const date = new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
  return (
    <Link href={`/blog/${post.id}`} className="relative overflow-hidden flex flex-col items-stretch max-w-md mx-auto">
      <Image src={post.image_url ? post.image_url : '/svg/blank.svg'} alt="basket" width={1000} height={1000} className='' />
      <div className="p-4 flex flex-col items-start justify-start">
        <div className="flex items-center gap-2 text-sm mb-6">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-xl text-gray-400" />
            <span className="smallcaps">{date}</span>
          </div>
          
          {/* divider */}
          <div className="block h-full w-px bg-gray-400" />

          <div className="flex items-center gap-2">
            <FaPenSquare className="text-gray-400" />
            <span className="text-gray-500">By {post.author}</span>
          </div>
        </div>
        <h3 className="h4">{post.title}</h3>
        <div className="">{post.preview}</div>
      </div>
    </Link>
)
}

export default BlogCard;
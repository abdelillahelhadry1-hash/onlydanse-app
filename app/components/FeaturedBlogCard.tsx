import Link from "next/link";

export default function FeaturedBlogCard({ post }: { post: any }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="min-w-[260px] bg-white rounded-xl shadow p-4 block"
    >
      <h3 className="font-semibold">{post.title}</h3>
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
        {post.excerpt}
      </p>
    </Link>
  );
}

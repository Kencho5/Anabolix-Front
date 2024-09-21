import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_API_URL;

interface Post {
  id: number | string;
  product: string;
  price: number;
  description: string;
}

const fetchPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
  });
  return response.json();
};

const Posts = () => {
  const { data: posts } = useQuery("Posts", fetchPosts, {
    suspense: true,
  });

  return (
    <div className="w-full space-y-4">
      {posts.map((post: Post) => (
        <div key={post.id} className="rounded-md border bg-white p-4 shadow-sm">
          <h4 className="text-lg font-semibold">{post.product}</h4>
          <p className="text-stone-600">Price: ${post.price}</p>
          <p className="text-stone-500">{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;

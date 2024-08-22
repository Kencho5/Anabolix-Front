import { useEffect, useState } from "preact/hooks";

const API_URL = import.meta.env.VITE_API_URL;

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const response = await fetch(`${API_URL}/posts`, {
          method: "POST",
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="h-[110px] animate-pulse rounded-md border bg-white p-4 shadow-sm"
          >
            <div className="mb-2 h-6 w-3/4 rounded bg-stone-200"></div>
            <div className="mb-2 h-4 w-1/2 rounded bg-stone-200"></div>
            <div className="h-4 w-3/4 rounded bg-stone-200"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {posts.map((post) => (
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

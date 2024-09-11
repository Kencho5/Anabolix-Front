import { useAuth } from "../auth/AuthContext";
import { Suspense, lazy } from "react";

const Posts = lazy(() => import("../components/Posts"));

const Home = () => {
  const { loggedIn } = useAuth();

  return (
    <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-2 rounded-xl bg-stone-200 p-4">
      <h3 className="mb-2 text-2xl font-bold text-stone-900">Home</h3>
      <img
        src="/avatar.jpg"
        width={128}
        height={128}
        className="h-[128px] w-[128px] rounded-xl"
        alt=""
      />
      {loggedIn ? (
        <p className="mb-4 text-lg text-green-600">Authenticated</p>
      ) : (
        <p className="mb-4 text-lg text-red-600">Unauthorized</p>
      )}

      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </div>
  );
};

const PostsSkeleton = () => (
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

export default Home;

import Posts from "../components/Posts";
import { useAuth } from "../auth/AuthContext";
import avatar from "/avatar.jpg";

const Home = () => {
  const { loggedIn } = useAuth();

  return (
    <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-2 rounded-xl bg-stone-200 p-4">
      <h3 className="mb-2 text-2xl font-bold text-stone-900">Home</h3>
      <img
        src={avatar}
        width={128}
        height={128}
        className="rounded-xl"
        alt=""
      />
      {loggedIn ? (
        <p className="mb-4 text-lg text-green-600">Authenticated</p>
      ) : (
        <p className="mb-4 text-lg text-red-600">Unauthorized</p>
      )}
      <Posts />
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSinglePost, deletePost } from "@/data";
import { PostSkeleton } from "@/components";
import { RiEditBoxFill, RiDeleteBin7Fill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";

const Post = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const posts = await getSinglePost(id);
        setPost(posts);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <PostSkeleton />;
  return (
    <>
      <div className="flex items-start justify-between">
        <Link to={"/"} className="text-xl p-6 hover:text-slate-400">
          <IoMdArrowRoundBack />
        </Link>
        <div className="flex">
          <Link
            to={`/edit/${post.id}`}
            className="text-xl p-6 rounded-md hover:text-green-600"
          >
            <RiEditBoxFill />
          </Link>
          <Link
            onClick={handleDelete}
            className="text-xl p-6 rounded-md hover:text-red-600"
          >
            <RiDeleteBin7Fill />
          </Link>
        </div>
      </div>
      <h1 className="text-center text-4xl mb-4">{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        className="rounded-lg max-h-96 mx-auto"
      />
      <div className="flex items-center text-slate-400 p-6 mt-3 mb-4">
        <p>{post.content}</p>
      </div>
    </>
  );
};

export default Post;

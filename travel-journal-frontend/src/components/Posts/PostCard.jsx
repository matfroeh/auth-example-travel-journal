import { Link } from "react-router-dom";

const PostCard = (post) => {
  const {
    _id,
    title,
    image,
    content,
    author: { firstName, lastName },
  } = post;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="bg-white h-48">
        <img src={image} alt={title} className="object-cover h-full w-full" />
      </figure>
      <div className="card-body h-56">
        <p className="text-xs text-right">
          {firstName} {lastName}
        </p>
        <h2 className="card-title">{title}</h2>

        <p className="truncate text-wrap">{content}</p>
        <div className="flex justify-center">
          <Link to={`/post/${_id}`} className="btn w-26 mt-4 hover:btn-accent">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

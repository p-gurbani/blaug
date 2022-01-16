import { Link } from "react-router-dom";
import { SERVER_BASE_URL } from "../../links";
import "./post.css";

const Post = ({ post }) => {
  return (
    <div className="post">
      <Link className="link" to={`/post/${post._id}`}>
        {post.imageURL && (
          <img
            src={`${SERVER_BASE_URL}${post.imageURL}`}
            alt="Post"
            className="post-img"
          />
        )}
      </Link>
      <div className="post-info">
        {post.categories && (
          <div className="post-cats">
            {post.categories.map((cat, i) => (
              <span key={i} className="post-cat">
                {cat}
              </span>
            ))}
          </div>
        )}

        <Link className="link post-title" to={`/post/${post._id}`}>
          {post.title}
        </Link>
        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="post-desc">{post.desc}</p>
    </div>
  );
};

export default Post;

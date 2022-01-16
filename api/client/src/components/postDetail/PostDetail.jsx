import "./postDetail.css";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../../links";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import Request from "../../services/Request";
import PostDetailSkeleton from "./PostDetailSkeleton";

const PostDetail = ({ postId }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [fetchingPost, setFetchingPost] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editMode, setEditMode] = useState(false);

  const getPost = async () => {
    setFetchingPost(true);
    try {
      const result = await Request.get(`/posts/${postId}`);
      setPost(result.post);
      setTitle(result.post.title);
      setDesc(result.post.desc);
      setEditMode(false);
    } catch (error) {}
    setFetchingPost(false);
  };

  const deletePost = async () => {
    try {
      const result = await Request.delete(`/posts/${post._id}`, {
        username: user.username,
      });
      if (result.success) {
        navigate("/");
      }
    } catch (err) {}
  };

  const updatePost = async () => {
    try {
      const result = await Request.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      if (result.success) {
        getPost();
      }
    } catch (err) {}
  };

  const cancel = () => {
    setTitle(post.title);
    setDesc(post.desc);
    setEditMode(false);
  };

  useEffect(() => {
    if (postId) {
      getPost();
    }
  }, [postId]);

  useEffect(() => {
    if (editMode) titleInputRef.current.focus();
  }, [editMode]);

  const textAreaRef = useRef();
  const titleInputRef = useRef();

  // Auto-grow text area as the user types
  const autoGrow = () => {
    const el = textAreaRef.current;
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <>
      {fetchingPost && <PostDetailSkeleton />}
      {!fetchingPost && post && (
        <div className="pd">
          {post.imageURL && (
            <img
              src={`${SERVER_BASE_URL}${post.imageURL}`}
              alt=""
              className="pd-img"
            />
          )}

          <div className="pd-wrapper">
            {editMode ? (
              <>
                <input
                  type="text"
                  ref={titleInputRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pd-input-title"
                />
                <div className="pd-edit-actions">
                  <button className="pd-btn pd-cancel-btn" onClick={cancel}>
                    Cancel
                  </button>
                  <button className="pd-btn pd-update-btn" onClick={updatePost}>
                    Update
                  </button>
                </div>
              </>
            ) : (
              <h1 className="pd-title">
                {post.title}
                {post.username === user?.username && (
                  <div className="pd-edit">
                    <i
                      className="fas pd-edit-icon fa-edit"
                      onClick={() => setEditMode(true)}
                    ></i>
                    <i
                      className="fas pd-edit-icon fa-trash"
                      onClick={deletePost}
                    ></i>
                  </div>
                )}
              </h1>
            )}
            <div className="pd-info">
              <span className="pd-info-author">
                Author:
                <Link to={`/?user=${post.username}`} className="link">
                  <b>&nbsp;{post.username}</b>
                </Link>
              </span>
              <span className="pd-info-date">
                {new Date(post.createdAt).toDateString()}
              </span>
            </div>
            {editMode ? (
              <textarea
                placeholder="Tell your story..."
                type="text"
                onInput={autoGrow}
                ref={textAreaRef}
                className="pd-textarea"
                value={desc}
                onClick={autoGrow}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            ) : (
              <div className="pd-desc">{post.desc}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;

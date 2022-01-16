import "./post.css";
import Sidebar from "../../components/sidebar/Sidebar";
import PostDetail from "../../components/postDetail/PostDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Request from "../../services/Request";

const Post = () => {
  const params = useParams();

  return (
    <div className="pst">
      {params.postId && <PostDetail postId={params.postId} />}
      <Sidebar />
    </div>
  );
};

export default Post;

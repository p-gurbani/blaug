import "./home.css";
import "../../components/posts/posts.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import Request from "../../services/Request";
import { useSearchParams } from "react-router-dom";
import PostSkeleton from "../../components/post/PostSkeleton";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [searchParams] = useSearchParams();

  const criteria = searchParams.toString();

  useEffect(() => {
    const getPosts = async () => {
      setFetchingPosts(true);
      try {
        const result = await Request.get(
          "/posts" + (criteria ? `?${criteria}` : "")
        );
        setPosts(result.posts);
      } catch (error) {}
      setFetchingPosts(false);
    };
    getPosts();
  }, [searchParams, criteria]);

  return (
    <>
      {!criteria && <Header />}
      <div className="home">
        {fetchingPosts ? (
          <div className="ps">
            {[1, 2, 3, 4].map((i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : (
          posts && posts.length ? <Posts posts={posts} /> : (
            <div className="ps ps-msg">No posts found!</div>
          )
        )}
        <Sidebar />
      </div>
    </>
  );
};

export default Home;

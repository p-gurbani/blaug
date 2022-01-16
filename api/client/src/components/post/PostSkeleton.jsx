import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./post.css";

const PostSkeleton = () => {
  return (
    <div className="post">
      <div className="post-img">
        <Skeleton className="hw-full" />
      </div>

      <div className="post-info">
        <div className="post-title hw-full">
          <Skeleton style={{height: "40px"}}/>
        </div>

        <span className="post-date" style={{width: "80px"}}>
          <Skeleton />
        </span>
      </div>
      <p className="post-desc">
        <Skeleton className="hw-full" count={3} />
      </p>
    </div>
  );
};

export default PostSkeleton;

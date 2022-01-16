import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./postDetail.css";

const PostDetailSkeleton = () => {
  return (
    <div className="pd hw-full">
      <div className="pd-img">
        <Skeleton className="hw-full" />
      </div>

      <div className="pd-wrapper">
        <h1 className="pd-title">
          <Skeleton />
        </h1>

        <div className="pd-info">
          <span className="pd-info-author">
            <Skeleton width={100}/>
          </span>
          <span className="pd-info-date">
            <Skeleton width={100}/>
          </span>
        </div>
        <div className="pd-desc">
          <Skeleton count={8}/>
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;

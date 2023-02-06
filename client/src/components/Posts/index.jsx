import PostItem from '../PostItem';
import { useSelector } from 'react-redux';
import PostSkeleton from '../Skeletons/PostSkeleton';

const Posts = () => {
  let posts = useSelector((state) => state.posts.posts);
  const { isUserLoading } = useSelector((state) => state.user);
  const { isPostsLoading } = useSelector((state) => state.posts);
  let skeletonArr = new Array(6).fill('');

  if (isUserLoading || isPostsLoading) {
    return (
      <div className="last-messages__content card-shadow">
        {skeletonArr.map((_) => (
          <PostSkeleton />
        ))}
      </div>
    );
  }

  return (
    <div className="last-messages__content card-shadow">
      {posts.map((item, index) => (
        <PostItem
          avatarUrl={item.avatarphoto}
          text={item.content}
          name={item.name}
          nickname={item.nickname}
          date={item.postdate}
          replies={item.replies}
          likes={item.likes}
          forward={item.reposts}
          attachment={item.attachment}
          user_id={item.user_id}
          isLast={index === posts.length - 1}
          post_id={item.post_id}
        />
      ))}
    </div>
  );
};

export default Posts;

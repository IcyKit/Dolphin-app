import { useEffect } from 'react';
import './PostsByID.css';
import PostItem from '../PostItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsById } from '../../store/slices/posts';
import PostSkeleton from '../Skeletons/PostSkeleton';

const PostsByID = ({ id }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.filteredPosts);
  const { isUserLoading } = useSelector((state) => state.user);
  const { isPostsLoading } = useSelector((state) => state.posts);
  let skeletonArr = new Array(6).fill('');

  useEffect(() => {
    dispatch(fetchPostsById(id));
  }, [id]);

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

export default PostsByID;

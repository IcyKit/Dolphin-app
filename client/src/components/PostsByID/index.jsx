import { useEffect } from 'react';
import './PostsByID.css';
import PostItem from '../PostItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsById } from '../../store/slices/posts';

const PostsByID = ({ id }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.filteredPosts);

  useEffect(() => {
    dispatch(fetchPostsById(id));
  }, [id]);

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
        />
      ))}
    </div>
  );
};

export default PostsByID;

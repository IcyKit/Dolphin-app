import PostItem from '../PostItem';
import { useSelector } from 'react-redux';

const Posts = () => {
  let posts = useSelector((state) => state.posts.posts);

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

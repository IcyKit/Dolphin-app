import PostItem from '../PostItem';
import './Posts.css';
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <div class="last-messages__content card-shadow">
      {posts.map((item) => (
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
        />
      ))}
    </div>
  );
};

export default Posts;

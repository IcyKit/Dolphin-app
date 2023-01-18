import { useEffect } from "react";
import PostItem from "../PostItem";
import "./Posts.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/slices/posts";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

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

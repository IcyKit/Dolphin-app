import axios from "axios";
import { useEffect, useState } from "react";
import PostItem from "../PostItem";
import "./Posts.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/slices/posts";

const Posts = () => {
  const dispatch = useDispatch();
  // const [posts, setPosts] = useState([]);
  // const fetchPosts = async () => {
  //   const { data } = await axios.get("http://localhost:3001/posts");
  //   setPosts(data);
  // };

  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);

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

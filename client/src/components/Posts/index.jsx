import axios from "axios";
import { useEffect, useState } from "react";
import PostItem from "../PostItem";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:3001/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
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

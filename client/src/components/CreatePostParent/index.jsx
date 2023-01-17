import { useState, useEffect } from "react";
import CreatePostDesktop from "../CreatePostDesktop";
import CreatePostMobile from "../CreatePostMobile";

const CreatePostParent = () => {
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState("");

  useEffect(() => {
    setLength(text.length);
  }, [text]);

  const onTextInput = (e) => {
    setText(e.target.value);
  };

  const createPost = async () => {
    setIsLoading(true);
    const token = document.cookie
      .split("=")
      .filter((item) => item.length > 10)[0];
    axios
      .post("http://localhost:3001/posts", {
        content: text,
        token: token,
        attachment: img,
      })
      .catch((e) => console.log(e.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <CreatePostDesktop
        isLoading={isLoading}
        text={text}
        length={length}
        createPost={createPost}
        onTextInput={onTextInput}
        setImg={setImg}
      />
      <CreatePostMobile
        isLoading={isLoading}
        text={text}
        length={length}
        createPost={createPost}
        onTextInput={onTextInput}
        setImg={setImg}
      />
    </>
  );
};

export default CreatePostParent;

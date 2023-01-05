import "./CreatePostDesktop.css";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const CreatePostDesktop = () => {
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(text.length);
  }, [text]);

  const onTextInput = (e) => {
    setText(e.target.value);
  };

  return (
    <section class="post-popup-desktop">
      <textarea
        placeholder="Введите сообщение"
        onChange={(e) => onTextInput(e)}
        maxLength="140"
      >
        {text}
      </textarea>
      <div class="post-popup-desktop-footer">
        <div class="post-popup-attach">
          <button class="btn">
            <img src="/attach.png" alt="" />
          </button>
        </div>
        <div class="post-popup-footer-right">
          <div class="post-popup-circle">
            <CircularProgress variant="determinate" value={length / 1.4} />
            <p>{length}</p>
          </div>
          <div class="post-popup-send">
            <button class="btn btn-active">Отправить</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePostDesktop;

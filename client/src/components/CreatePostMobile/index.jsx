import "./CreatePostMobile.css";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const CreatePostMobile = () => {
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(text.length);
  }, [text]);

  const onTextInput = (e) => {
    setText(e.target.value);
  };

  return (
    <section class="post-popup-mobile">
      <div class="post-popup-content">
        <div class="post-popup-comment">
          <div class="post-popup-drag"></div>
          <div class="post-popup-replyto">
            <img src="/musk.png" alt="" />
            <p>В ответ @elonmusk</p>
          </div>
          <div class="post-popup-message">
            <textarea
              placeholder="Введите сообщение"
              maxLength="140"
              onChange={(e) => onTextInput(e)}
            >
              {text}
            </textarea>
          </div>
          <div class="post-popup-footer">
            <div class="post-popup-circle">
              <CircularProgress variant="determinate" value={length / 1.4} />
              {length > 0 && <p>{length}</p>}
            </div>
            <div class="post-popup-attach">
              <button class="btn">
                <img src="/attach.png" alt="" />
              </button>
            </div>
            <div class="post-popup-send">
              <button class="btn btn-active">Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePostMobile;

import "./CreatePostDesktop.css";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Widget } from "@uploadcare/react-widget";

const CreatePostDesktop = () => {
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

  const uploadImg = async (img) => { };

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
    <section className="post-popup-desktop">
      <textarea
        placeholder="Введите сообщение"
        onChange={(e) => onTextInput(e)}
        maxLength="140"
        value={text}
      />
      <div className="post-popup-desktop-footer">
        <div className="post-popup-attach">
          {/* <input */}
          {/*   className="btn" */}
          {/*   type="file" */}
          {/*   id="attach-btn" */}
          {/*   hidden */}
          {/*   onChange={(e) => uploadImg(e.target.files[0])} */}
          {/* /> */}
          {/* <label for="attach-btn" className="btn"> */}
          {/* <img src="/attach.png" /> */}
          {/* </label> */}
          <div className="wrapper">
            <Widget
              publicKey="76c56b73b9d7c613465c"
              id="file"
              className="widget"
              onChange={(info) => setImg(info.cdnUrl)}
            />
          </div>
        </div>

        <p className="post-popup-attach-name">{img.name}</p>
        <div className="post-popup-footer-right">
          <div className="post-popup-circle">
            <CircularProgress variant="determinate" value={length / 1.4} />
            <p>{length > 0 ? length : ""}</p>
          </div>
          <div className="post-popup-send">
            <button
              className={`btn btn-active ${length === 0 ? "btn-disabled" : ""}`}
              onClick={() => createPost()}
              disabled={length > 0 ? "" : "disabled"}
            >
              Отправить
            </button>
          </div>
        </div>
        {isLoading && <CircularProgress />}
      </div>
    </section>
  );
};

export default CreatePostDesktop;

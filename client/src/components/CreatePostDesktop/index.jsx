import "./CreatePostDesktop.css";
import { CircularProgress } from "@mui/material";
import AttachToPost from "../AttachToPost";
import TextAreaCircular from "../TextAreaCircular";
import TextArea from "../TextArea";
const CreatePostDesktop = ({
  text,
  length,
  isLoading,
  createPost,
  onTextInput,
  setImg,
}) => {
  return (
    <section className="post-popup-desktop">
      <TextArea onTextInput={onTextInput} text={text} />
      <div className="post-popup-desktop-footer">
        <AttachToPost setImg={setImg} />
        {/* <p className="post-popup-attach-name">{img.name}</p> */}
        <div className="post-popup-footer-right">
          <TextAreaCircular length={length} />
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

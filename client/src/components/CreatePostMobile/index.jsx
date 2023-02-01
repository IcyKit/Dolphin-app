import './CreatePostMobile.css';
import { CircularProgress } from '@mui/material';
import AttachToPost from '../AttachToPost';
import TextAreaCircular from '../TextAreaCircular';
import TextArea from '../TextArea';
const CreatePostMobile = ({
  isLoading,
  text,
  length,
  createPost,
  onTextInput,
  setImg,
}) => {
  return (
    <section className="post-popup-mobile">
      <div className="post-popup-content">
        <div className="post-popup-comment">
          <div className="post-popup-drag"></div>
          {/* <div className="post-popup-replyto"> */}
          {/*   <img src="/musk.png" alt="" /> */}
          {/*   <p>В ответ @elonmusk</p> */}
          {/* </div> */}
          <div className="post-popup-message">
            <TextArea onTextInput={onTextInput} text={text} />
          </div>
          <div className="post-popup-footer">
            <AttachToPost setImg={setImg} />

            <TextAreaCircular length={length} />
            <div className="post-popup-send">
              <button onClick={() => createPost()} className="btn btn-active">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePostMobile;

import "./CreatePost.css";
import {useSelector} from "react-redux";

const CreatePost = ({ setIsOpen }) => {
  const {name} = useSelector(state => state.user.userData)
  return (
    <section className="new-post">
      <form onClick={() => setIsOpen(true)}>
        <input
          type="text"
          class="new-post-input card-shadow"
          placeholder={`Что нового, ${name}?`}
        />
      </form>
    </section>
  );
};

export default CreatePost;

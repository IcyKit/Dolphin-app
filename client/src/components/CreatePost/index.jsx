import "./CreatePost.css";

const CreatePost = ({ setIsOpen }) => {
  return (
    <section className="new-post">
      <form onClick={() => setIsOpen(true)}>
        <input
          type="text"
          class="new-post-input card-shadow"
          placeholder="Что нового, Donald?"
        />
      </form>
    </section>
  );
};

export default CreatePost;

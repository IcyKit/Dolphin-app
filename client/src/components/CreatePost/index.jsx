import "./CreatePost.css";

const CreatePost = () => {
  return (
    <section className="new-post">
      <form>
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

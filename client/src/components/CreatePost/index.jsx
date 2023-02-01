import './CreatePost.css';
import { useSelector } from 'react-redux';
import CreatePostParent from '../CreatePostParent';
import { useState } from 'react';

const CreatePost = () => {
  const { name } = useSelector((state) => state.user.userData);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="new-post">
      {isOpen ? (
        <CreatePostParent />
      ) : (
        <form onClick={() => setIsOpen(true)}>
          <input
            type="text"
            className="new-post-input card-shadow"
            placeholder={`Что нового, ${name}?`}
          />
        </form>
      )}
    </section>
  );
};

export default CreatePost;

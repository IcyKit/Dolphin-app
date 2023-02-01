import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePostDesktop from '../CreatePostDesktop';
import CreatePostMobile from '../CreatePostMobile';
import { fetchCreatePost } from '../../store/slices/posts';

const CreatePostParent = () => {
  const [text, setText] = useState('');
  const [length, setLength] = useState(0);
  const [img, setImg] = useState('');
  const isEditorLoading = useSelector((state) => state.posts.isEditorLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    setLength(text.length);
  }, [text]);

  const onTextInput = (e) => {
    setText(e.target.value);
  };

  const createPost = async () => {
    dispatch(fetchCreatePost({ text, img }));
    // dispatch(incPosts());
  };

  return (
    <>
      <CreatePostDesktop
        isLoading={isEditorLoading}
        text={text}
        length={length}
        createPost={createPost}
        onTextInput={onTextInput}
        setImg={setImg}
      />
      <CreatePostMobile
        isLoading={isEditorLoading}
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

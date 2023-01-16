const TextArea = ({ text, onTextInput }) => {
  return (
    <textarea
      placeholder="Введите сообщение"
      maxLength="140"
      onChange={(e) => onTextInput(e)}
      value={text}
    />
  );
};

export default TextArea;

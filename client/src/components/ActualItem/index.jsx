const ActualItem = ({ title, messages }) => {
  return (
    <div className="actual__theme">
      <h4>#{title}</h4>
      <div className="actual__theme-description">
        <p>{messages} сообщений</p>
      </div>
    </div>
  );
};

export default ActualItem;

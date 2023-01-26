const ActualItem = ({ title, location, messages }) => {
  return (
    <div className="actual__theme">
      <h4>{title}</h4>
      <div className="actual__theme-description">
        <div className="actual__theme-destination">
          <img src="/mark.png" alt="mark" />
          <h5>{location}</h5>
        </div>
        <p>{messages} сообщений</p>
      </div>
    </div>
  );
};

export default ActualItem;

const ActualItem = ({ title, location, messages }) => {
  return (
    <div class="actual__theme">
      <h4>{title}</h4>
      <div class="actual__theme-description">
        <div class="actual__theme-destination">
          <img src="../../../public/mark.png" alt="mark" />
          <h5>{location}</h5>
        </div>
        <p>{messages} сообщений</p>
      </div>
    </div>
  );
};

export default ActualItem;

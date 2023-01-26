const BloggersItem = ({ name, nickname, avatarUrl }) => {
  return (
    <div className="blogger">
      <div className="blogger__left">
        <img src={avatarUrl} alt="avatar" />
        <div className="blogger__title">
          <h4>{name}</h4>
          <p>@{nickname}</p>
        </div>
      </div>
      <div className="btn">Читать</div>
    </div>
  );
};

export default BloggersItem;

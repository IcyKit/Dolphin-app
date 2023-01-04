const BloggersItem = ({ name, nickname, avatarUrl }) => {
  return (
    <div class="blogger">
      <div class="blogger__left">
        <img src={avatarUrl} alt="avatar" />
        <div class="blogger__title">
          <h4>{name}</h4>
          <p>@{nickname}</p>
        </div>
      </div>
      <div class="btn">Читать</div>
    </div>
  );
};

export default BloggersItem;

import { Link } from 'react-router-dom';

const BloggersItem = ({ name, nickname, avatarUrl, id }) => {
  return (
    <div className="blogger">
      <Link to={`/app/users/${id}`}>
        <div className="blogger__left">
          <img src={avatarUrl} alt="avatar" />
          <div className="blogger__title">
            <h4>{name}</h4>
            <p>@{nickname}</p>
          </div>
        </div>
      </Link>
      <div className="btn">Читать</div>
    </div>
  );
};

export default BloggersItem;

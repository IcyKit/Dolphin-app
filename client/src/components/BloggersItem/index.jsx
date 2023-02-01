import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BloggersItem = ({ name, nickname, avatarUrl, user_id }) => {
  const { id } = useSelector((state) => state.user.userData);
  return (
    <div className="blogger">
      <Link to={`/app/users/${user_id}`}>
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

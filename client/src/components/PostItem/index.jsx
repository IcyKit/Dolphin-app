import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsReply } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PostItem = ({
  avatarUrl,
  name,
  nickname,
  text,
  date,
  replies,
  likes,
  forward,
  attachment,
  user_id,
  isLast,
}) => {
  const [isLike, setIsLike] = useState(false);
  const { id } = useSelector((state) => state.user.userData);
  const user_link = user_id === id ? '/app/profile' : `/app/users/${user_id}`;

  const makeSentence = (number, words) => {
    number = Math.abs(number) % 100;
    let n1 = number % 10;
    if (number > 10 && number < 20) {
      return `${number} ${words[2]} назад`;
    }
    if (n1 > 1 && n1 < 5) {
      return `${number} ${words[1]} назад`;
    }
    if (n1 == 1) {
      return `${number} ${words[0]} назад`;
    }
    return `${number} ${words[2]} назад`;
  };
  const getTimeOfMessage = (time) => {
    const timeElapsed = new Date() - new Date(time);
    const minutes = Math.floor(timeElapsed / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const minutesArr = ['минуту', 'минуты', 'минут'];
    const hoursArr = ['час', 'часа', 'часов'];
    const daysArr = ['день', 'дня', 'дней'];
    if (days > 365) {
      return 'Больше года назад';
    } else if (days > 31) {
      return 'Больше месяца назад';
    } else if (hours > 24) {
      return makeSentence(days, daysArr);
    } else if (minutes > 60) {
      return makeSentence(hours, hoursArr);
    } else {
      return makeSentence(minutes, minutesArr);
    }
  };

  const postDate = getTimeOfMessage(date);
  return (
    <>
      <div className={`last-messages__box ${isLast ? 'margin-reset' : ''}`}>
        <img
          className="last-messages__box-avatar"
          src={avatarUrl}
          alt="Avatar"
        />
        <div className="last-messages__box-right">
          <div className="last-messages__box-title">
            <div className="last-messages__box-title_left">
              <Link to={user_link}>
                <h3>{name}</h3>
              </Link>
              <p className="last-messages__box-nickname">@{nickname}</p>
            </div>
            <p className="last-messages__box-time">{postDate}</p>
          </div>

          <div className="last-messages__box-message">
            <p>{text}</p>
            {attachment && <img src={attachment} alt="attachment" />}
          </div>

          <div className="last-messages__box-statistics">
            <div
              className={`last-messages__box-statistic ${
                isLike ? 'active-icon' : ''
              }`}
              onClick={() => setIsLike(!isLike)}
            >
              <AiOutlineHeart />
              <p className="last-messages__box-statistic-title">{likes}</p>
            </div>
            <div className="last-messages__box-statistic">
              <BsReply />
              <p className="last-messages__box-statistic-title">{replies}</p>
            </div>

            <div className="last-messages__box-statistic">
              <FiShare />
              <p className="last-messages__box-statistic-title">{forward}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default PostItem;

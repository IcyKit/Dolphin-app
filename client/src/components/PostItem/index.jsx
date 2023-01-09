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
}) => {
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
    const minutesArr = ["минуту", "минуты", "минут"];
    const hoursArr = ["час", "часа", "часов"];
    const daysArr = ["день", "дня", "дней"];
    // Сменить вложенность
    if (minutes > 60) {
      if (hours > 24) {
        if (days > 365) {
          return "Больше года назад";
        }
        return makeSentence(days, daysArr);
      }
      return makeSentence(hours, hoursArr);
    }
    return makeSentence(minutes, minutesArr);
  };

  const postDate = getTimeOfMessage(date);
  return (
    <>
      <div class="last-messages__box">
        <img class="last-messages__box-avatar" src={avatarUrl} alt="Avatar" />
        <div class="last-messages__box-right">
          <div class="last-messages__box-title">
            <div class="last-messages__box-title_left">
              <h3>{name}</h3>
              <p class="last-messages__box-nickname">@{nickname}</p>
            </div>
            <p class="last-messages__box-time">{postDate}</p>
          </div>
          <div class="last-messages__box-message">
            <p>{text}</p>
            {attachment && <img src={attachment} alt="attachment" />}
          </div>
          <div class="last-messages__box-statistics">
            <div class="last-messages__box-statistic">
              <img src="/reply.png" alt="Reply" />
              <p class="last-messages__box-statistic-title">{replies}</p>
            </div>
            <div class="last-messages__box-statistic">
              <img src="/like.png" alt="Like" />
              <p class="last-messages__box-statistic-title">{likes}</p>
            </div>
            <div class="last-messages__box-statistic">
              <img src="/forward.png" alt="Forward" />
              <p class="last-messages__box-statistic-title">{forward}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </>
  );
};

export default PostItem;

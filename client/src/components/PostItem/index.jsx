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
            <p class="last-messages__box-time">{date}</p>
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

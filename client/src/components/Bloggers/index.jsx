import "./Bloggers.css";
import BloggersItem from "../BloggersItem";

const Bloggers = () => {
  const bloggers = [
    {
      name: "Хабр Научпоп",
      nickname: "habr_popsci",
      avatarUrl: "../../../public/blogger1.png",
    },
    {
      name: "Матч ТВ",
      nickname: "MatchTV",
      avatarUrl: "../../../public/blogger2.png",
    },
    {
      name: "Популярная механика",
      nickname: "PopMechanica",
      avatarUrl: "../../../public/blogger3.png",
    },
  ];

  return (
    <div class="bloggers aside__card card-shadow">
      <h3>Рекомендации для вас</h3>
      <div class="bloggers__content">
        {bloggers.map((item) => (
          <BloggersItem
            name={item.name}
            nickname={item.nickname}
            avatarUrl={item.avatarUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Bloggers;

import PostItem from "../PostItem";
import "./Posts.css";

const posts = [
  {
    avatarUrl: "../../../public/musk.png",
    text: "Has anybody seen web3? I can't find it.",
    name: "Elon Musk",
    nickname: "elonmusk",
    date: "28 минут назад",
    replies: 21,
    likes: 23,
    forward: 9,
  },
  {
    avatarUrl: "../../../public/roizman.png",
    text: "Пробежал десятку по набережной. Снег идет, тихо, светло. Все будет хорошо.",
    name: "Евгений Ройзман",
    nickname: "roizmangbn",
    date: "30 минут назад",
    replies: 21,
    likes: 23,
    forward: 9,
  },
  {
    avatarUrl: "../../../public/sport.png",
    text: "Кстати, год назад сборная была на 39-м месте. Прорыв! А лидер рейтинга вновь не поменялся.",
    attachment: "../../../public/karpin.png",
    name: "Sports.ru",
    nickname: "sportsru",
    date: "30 минут назад",
    replies: 21,
    likes: 23,
    forward: 9,
  },
  {
    avatarUrl: "../../../public/man.png",
    text: "В столице Австрии уже который месяц продолжаются митинги против введения электронных паспортов. В современной истории ещё не было таких массовых, продолжительных и глобальных протестов. Но журналистам не интересно рассказывать о том, что на самом деле волнует людей.",
    name: "Михаил",
    nickname: "msvetov",
    date: "30 минут назад",
    replies: 21,
    likes: 23,
    forward: 9,
  },
];

const Posts = () => {
  return (
    <div class="last-messages__content card-shadow">
      {posts.map((item) => (
        <PostItem
          avatarUrl={item.avatarUrl}
          text={item.text}
          name={item.name}
          nickname={item.nickname}
          date={item.date}
          replies={item.replies}
          likes={item.likes}
          forward={item.forward}
          attachment={item.attachment}
        />
      ))}
    </div>
  );
};

export default Posts;

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

const createFeed = async () => {
  const messagesResponse = await fetch("/posts/");
  const messagesData = await messagesResponse.json();

  const makeMessage = () => {
    const messagesList = document.querySelector("#messagesList");
    const messageItem = document.createElement("div");
    messagesList.innerHTML = "";
    messagesData.forEach((item, index) => {
      const timeOfMessage = getTimeOfMessage(item.postdate);
      messageItem.innerHTML += `
     <div class="last-messages__box">
                   <img
                     class="last-messages__box-avatar"
                     src=${messagesData[index]["avatarphoto"]}
                     alt="Avatar"
                   />
                   <div class="last-messages__box-right">
                     <div class="last-messages__box-title">
                       <div class="last-messages__box-title_left">
                         <h3>${item.name}</h3>
                         <p class="last-messages__box-nickname">@${item.nickname}</p>
                       </div>
                       <p class="last-messages__box-time">${timeOfMessage}</p>
                     </div>
                     <div class="last-messages__box-message">
                       <p>
                         ${item.content}
                       </p>
                     </div>
                     <div class="last-messages__box-statistics">
                       <div class="last-messages__box-statistic">
                         <img src="/resources/reply.png" alt="Reply" />
                         <p class="last-messages__box-statistic-title">${item.replies}</p>
                       </div>
                       <div class="last-messages__box-statistic">
                         <img src="/resources/like.png" alt="Like" />
                         <p class="last-messages__box-statistic-title">${item.likes}</p>
                       </div>
                       <div class="last-messages__box-statistic">
                         <img src="/resources/forward.png" alt="Forward" />
                         <p class="last-messages__box-statistic-title">${item.reposts}</p>
                       </div>
                     </div>
                   </div>
       </div>
       <div class="divider"></div>
      `;
    });
    messagesList.append(messageItem);
  };
  makeMessage();
  setInterval(makeMessage, 60000);
};

export default createFeed;

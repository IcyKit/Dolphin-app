const makeMessageWord = (number, words) => {
  number = Math.abs(number) % 100;
  let n1 = number % 10;
  if (number > 10 && number < 20) {
    return `${words[2]}`;
  }
  if (n1 > 1 && n1 < 5) {
    return `${words[1]}`;
  }
  if (n1 == 1) {
    return `${words[0]}`;
  }
  return `${words[2]} `;
};

const makeDividedNumbers = (number) => {
  number = number.toString();
  switch (number.length) {
    case 4:
      return `${number.slice(0, 1)} ${number.slice(1)}`;
    case 5:
      return `${number.slice(0, 2)} ${number.slice(2)}`;
    case 6:
      return `${number.slice(0, 3)} ${number.slice(3)}`;
    case 7:
      return `${number.slice(0, 1)} ${number.slice(1, 4)} ${number.slice(4)}`;
  }
  return `${number}`;
};

const createActual = async () => {
  const messagesResponse = await fetch('./data.json');
  const messagesData = await messagesResponse.json();
  const topics = messagesData.topics;

  const makeActual = () => {
    const topicsList = document.querySelector('#actual__themes');
    const topicItem = document.createElement('div');
    const messagesWords = ['сообщение', 'сообщения', 'сообщений'];
    topics.forEach((item) => {
      const dividedNumbers = makeDividedNumbers(item.messages);
      const messageWord = makeMessageWord(item.messages, messagesWords);
      topicItem.innerHTML += `
      <div class="actual__theme">
                <h4>${item.topic}</h4>
                <div class="actual__theme-description">
                  <div class="actual__theme-destination">
                    <img src="/resources/mark.png" alt="mark" />
                    <h5>${item.location}</h5>
                  </div>
                  <p>${dividedNumbers} ${messageWord}</p>
                </div>
              </div>
      `;
    });
    topicsList.append(topicItem);
  };
  makeActual();
};

export default createActual;

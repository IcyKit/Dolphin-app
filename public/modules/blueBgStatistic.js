const blueBgStatistic = async () => {
  const req = await fetch('./data.json');
  const { staticInfo } = await req.json();
  document.querySelector('#usersRegistered').innerHTML =
    staticInfo.usersRegistered;
  document.querySelector('#messagesSent').innerHTML = staticInfo.messagesSent;
  document.querySelector('#messagesToday').innerHTML = staticInfo.messagesToday;
};

export default blueBgStatistic;

import ActualItem from "../ActualItem";
import "./Actual.css";

const Actual = () => {
  const actual = [
    {
      title: "Новый год 2023",
      location: "Россия",
      messages: 2941,
    },
    {
      title: "BTS",
      location: "Мир",
      messages: 29718,
    },
    {
      title: "Украина",
      location: "Россия",
      messages: 958186,
    },
    {
      title: "Дудь",
      location: "Москва",
      messages: 4185,
    },
    {
      title: "ЛГБТ",
      location: "Москва",
      messages: 482,
    },
  ];

  return (
    <div class="actual aside__card card-shadow">
      <h3>Актуальные темы</h3>
      <div class="actual__themes">
        {actual.map((theme) => (
          <ActualItem
            title={theme.title}
            location={theme.location}
            messages={theme.messages}
          />
        ))}
      </div>
    </div>
  );
};

export default Actual;

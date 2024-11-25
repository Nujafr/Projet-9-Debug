import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  useEffect(() => {
    if (!byDateDesc) {
      return () => {};
    }

    const timeoutId = setTimeout(
      () => setIndex(index < (byDateDesc.length - 1) ? index + 1 : 0),
      5000
    );

    return () => clearTimeout(timeoutId);
  }, [index, byDateDesc]);

  if (!byDateDesc) return null;

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event) => (
        <div key={`${event.title}-${event.date}`}>
          <div
            className={`SlideCard SlideCard--${
              byDateDesc.indexOf(event) === index ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((paginationEvent) => (
                <input
                  key={`radio-${paginationEvent.title}-${paginationEvent.date}`}
                  type="radio"
                  name="radio-button"
                  checked={byDateDesc.indexOf(paginationEvent) === index}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
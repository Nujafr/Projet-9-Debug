import { useState, useMemo } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const typeList = useMemo(() => {
    if (!data?.events) return [];
    return Array.from(new Set(data.events.map((event) => event.type)));
  }, [data?.events]);

  const filteredByType = useMemo(() => {
    if (!data?.events) return [];
    
    if (!type) {
      return data.events;
    }
    
    return data.events.filter((event) => event.type === type);
  }, [data?.events, type]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return filteredByType.slice(startIndex, endIndex);
  }, [filteredByType, currentPage]);

  const pageNumber = Math.ceil(filteredByType.length / PER_PAGE);

  const handleTypeChange = (newType) => {
    setCurrentPage(1);
    setType(newType);
  };

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={handleTypeChange}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              <a
                key={`page-${n + 1}`}
                href="#events"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(n + 1);
                }}
                className={currentPage === n + 1 ? "active" : ""}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
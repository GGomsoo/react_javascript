import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchEvents from "../../util/http";

import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  // 현재 검색중인 일부 결과만을 얻고 싶다
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  // queryFn을 익명 함수로 설정, 검색 키워드를 포함한 결과를 얻고 싶다
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: () => fetchEvents(searchTerm),
  });

  let content = <p>Loading...</p>;

  // 시나리오에 따른 content 값을 설정하였음.
  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}

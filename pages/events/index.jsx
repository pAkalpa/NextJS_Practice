import { Fragment } from "react";
import EventsSearch from "../../components/event-detail/EventsSearch";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const router = useRouter();
  const allEvents = getAllEvents();

  const findEventHandler = (selectedYear, selectedMonth) => {
    router.push(`/events/${selectedYear}/${selectedMonth}`);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
};

export default AllEventsPage;

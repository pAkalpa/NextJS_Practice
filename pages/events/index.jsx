import { Fragment } from "react";
import EventsSearch from "../../components/event-detail/EventsSearch";
import EventList from "../../components/events/EventList";
import { useRouter } from "next/router";
import { getAllEvents } from "@/helpers/api-util";

const AllEventsPage = (props) => {
  const router = useRouter();
  const { allEvents } = props;

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

export const getStaticProps = async () => {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;

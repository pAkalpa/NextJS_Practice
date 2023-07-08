import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "../components/events/EventList";

const HomePage = (props) => {
  const { featuredEvents } = props;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { featuredEvents },
    revalidate: 1800,
  };
};

export default HomePage;

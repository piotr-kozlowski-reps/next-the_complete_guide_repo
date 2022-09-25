import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import Head from "next/head";

const AllEventsPage = (props) => {
  const { events } = props;
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="A lot of events." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 30,
  };
}

export default AllEventsPage;

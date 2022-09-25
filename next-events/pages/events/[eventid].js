import React, { Fragment } from "react";
import { getFeaturedEvents, getEventById } from "../../helpers/api-utils";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

const EventsDetailPage = (props) => {
  const { event } = props;

  if (!event) {
    return (
      <div className="center">
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={EventSummary.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventid;

  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths(context) {
  const allEvents = await getFeaturedEvents();
  const allPaths = allEvents.map((event) => {
    return { params: { eventid: event.id } };
  });

  return {
    paths: allPaths,
    fallback: true,
  };
}

export default EventsDetailPage;

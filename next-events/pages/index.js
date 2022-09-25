import Head from "next/head";
import EventList from "../components/events/EventList";
import { useState } from "react";
import { getFeaturedEvents } from "../helpers/api-utils";

function HomePage(props) {
  const { passedFeaturedEvents } = props;

  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta name="description" content="A lot of events." />
      </Head>
      <EventList items={passedFeaturedEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { passedFeaturedEvents: featuredEvents },
    revalidate: 60,
  };
}

export default HomePage;

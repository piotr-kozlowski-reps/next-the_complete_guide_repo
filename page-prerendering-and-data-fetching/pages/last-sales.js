import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR("address");

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("address")
  //     .then((response) => response.json)
  //     .then((data) => {
  //       setSales(data);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load</p>;
  }
  if (!data && !sales) {
    return <p>Loading ....</p>;
  }

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  return (
    <ul>
      {data.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  return fetch("address")
    .then((response) => response.json)
    .then((data) => {
      const transformedSales = [];
      for (key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return {
        props: { sales: transformedSales },
      };
    });
}

export default LastSalesPage;

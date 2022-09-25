import React from "react";

const UserIdProfile = (props) => {
  const { id } = props;
  return <div>{id}</div>;
};

export default UserIdProfile;

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}

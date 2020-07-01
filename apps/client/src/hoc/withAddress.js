import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { SessionContext } from "../context";
import { geturl, routes } from "../routes";
import withTopic from "./withTopic";

const withAddress = (Component) =>
  withTopic(({ ...rest }) => {
    const sessionContext = useContext(SessionContext);
    const { topic } = rest;

    const address = sessionContext[topic.slug]?.address;

    if (!address) {
      console.warn("No address found, redirecting to location page");
      return <Redirect to={geturl(routes.location, topic)} />;
    }

    return <Component {...{ ...rest, address }} />;
  });

export default withAddress;

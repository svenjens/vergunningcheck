import { useContext } from "react";
import Context from "../context";
import { topics } from "../config";

export default ({
  children,
  topicMock = "dakraam-plaatsen",
  addressMock,
  checker,
}) => {
  const context = useContext(Context);
  context.topic = topics.find((t) => t.slug === topicMock);
  if (addressMock) {
    context.data = {address: { postalCode: '1055xd', houseNumberFull: '19c' }};
  }
  if (checker) {
    context.checker = checker;
  }
  return children;
};

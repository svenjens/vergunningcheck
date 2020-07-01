import { useContext } from "react";

import { CheckerContext, SessionContext } from "../context";

export default ({
  children,
  topicMock = "dakraam-plaatsen",
  addressMock,
  checker,
  questionIndex,
}) => {
  const checkerContext = useContext(CheckerContext);
  const sessionContext = useContext(SessionContext);
  const setSessionData = jest.fn();

  if (checker) {
    checkerContext.checker = checker;
  }

  if (topicMock) {
    checkerContext.topic = topicMock;
  }

  sessionContext[topicMock] = {
    address: addressMock,
    questionIndex,
  };

  sessionContext.setSessionData = setSessionData;
  return children;
};

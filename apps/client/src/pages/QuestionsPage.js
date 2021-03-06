import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Redirect, useHistory, useParams } from "react-router-dom";

import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import Question, { booleanOptions } from "../components/Question";
import { getDataNeedResultPageOrPrevious } from "../config/autofill";
import { SessionContext } from "../context";
import withAutofillData from "../hoc/withAutofillData";
import { autofillRoutes, getslug, geturl, routes } from "../routes";

const QuestionsPage = ({ topic, checker }) => {
  const sessionContext = useContext(SessionContext);
  const params = useParams();
  const history = useHistory();
  const { question: questionSlug } = params;
  const [question, setQuestion] = useState(
    checker.stack[checker.stack.length - 1]
  );

  const { slug } = topic;
  const currSlug = getslug(question.text);
  const sessionTopic = sessionContext[slug] || { questionIndex: 0 };

  // Update URL when it's not set (first question) and when URL differs from the current question
  if (!questionSlug || questionSlug !== currSlug) {
    return (
      <Redirect
        to={geturl(routes.questions, {
          slug,
          question: currSlug,
        })}
      />
    );
  }

  const onQuestionNext = (value) => {
    // Provide the user answers to the `sttr-checker`
    if (question.options && value !== undefined) {
      question.setAnswer(value);
    }
    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    // Store all answers in the session context
    sessionContext.setSessionData([
      slug,
      {
        answers: checker.getQuestionAnswers(),
      },
    ]);

    // Load next question
    const next = checker.next();

    // Go directly to the Conclusion Page, without passing the Results Page
    // Only if the `sttr-checker` is the final question
    if (checker.needContactExit(question)) {
      // Undo the next() with previous(), because we were already at the final question
      checker.previous();

      // Change the URL to the Conclusion Page
      history.push(geturl(routes.conclusion, topic));
    } else {
      // Load the next question or go to the Result Page
      if (next) {
        // Store the new questionIndex in the session
        sessionContext.setSessionData([
          slug,
          {
            questionIndex: sessionTopic.questionIndex + 1,
          },
        ]);

        // Go to Next question
        setQuestion(next);

        // Change the URL to the new question
        history.push(
          geturl(routes.questions, {
            slug,
            question: getslug(next.text),
          })
        );
      } else {
        // Go to Result page if there is no new quesion
        history.push(geturl(routes.results, topic));
      }
    }
  };

  const goBack = () => {
    const route = getDataNeedResultPageOrPrevious(
      checker,
      autofillRoutes,
      routes
    );
    const url = geturl(route, topic);
    history.push(url);
  };

  const onQuestionPrev = () => {
    // Load the previous question or go to the Location Page
    if (checker.stack.length > 1) {
      const prev = checker.previous();

      // Store the new questionIndex in the session
      sessionContext.setSessionData([
        slug,
        {
          questionIndex: sessionTopic.questionIndex - 1,
        },
      ]);

      // Go to Prev question
      setQuestion(prev);

      // Change the URL to the new question
      history.push(
        geturl(routes.questions, {
          slug,
          question: getslug(prev.text),
        })
      );
    } else {
      goBack();
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {topic.text.heading} - {question.text}
        </title>
      </Helmet>
      <Question
        question={question}
        onSubmit={onQuestionNext}
        onGoToPrev={onQuestionPrev}
        showNext
        showPrev
      />

      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};

export default withAutofillData(QuestionsPage);

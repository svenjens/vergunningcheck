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

  const currSlug = getslug(question.text);

  // Update URL when it's not set (first question) and when URL differs from the current question
  if (!questionSlug || questionSlug !== currSlug) {
    return (
      <Redirect
        to={geturl(routes.questions, {
          slug: topic.slug,
          question: currSlug,
        })}
      />
    );
  }

  const needContactPermits = () =>
    checker.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(
        (rule) => rule.outputValue === '"NeemContactOpMet"'
      );
    });

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
    sessionContext.setSessionData({
      answers: checker.getQuestionAnswers(),
    });

    // Load next question
    const next = checker.next();

    // Go directly to the Conclusion Page, without passing the Results Page
    // Only if the `sttr-checker` is the final question
    if (needContactPermits() && !next) {
      // Undo the next() with previous(), because we were already at the final question
      checker.previous();

      // Change the URL to the Conclusion Page
      history.push(geturl(routes.conclusion, topic));
    } else {
      // Load the next question or go to the Result Page
      if (next) {
        // Store the new questionIndex in the session
        sessionContext.setSessionData({
          questionIndex: sessionContext.questionIndex + 1,
        });

        // Go to Next question
        setQuestion(next);

        // Change the URL to the new question
        history.push(
          geturl(routes.questions, {
            slug: topic.slug,
            question: getslug(next.text),
          })
        );
      } else {
        // Go to Result page if there is no new quesion
        history.push(geturl(routes.results, topic));
      }
    }
  };

  const onQuestionPrev = () => {
    // Load the previous question or go to the Location Page
    if (checker.stack.length > 1) {
      const prev = checker.previous();

      // Store the new questionIndex in the session
      sessionContext.setSessionData({
        questionIndex: sessionContext.questionIndex - 1,
      });

      // Go to Prev question
      setQuestion(prev);

      // Change the URL to the new question
      history.push(
        geturl(routes.questions, {
          slug: topic.slug,
          question: getslug(prev.text),
        })
      );
    } else {
      goBack();
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

      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default withAutofillData(QuestionsPage);

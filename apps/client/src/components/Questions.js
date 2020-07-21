import { Button, Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";
import Question, { booleanOptions } from "./Question";
import { StepByStepItem } from "./StepByStepNavigation";

const Questions = ({ checker, topic }) => {
  const sessionContext = useContext(SessionContext);
  const { slug } = topic;

  const onQuestionNext = (value) => {
    const question = checker.stack[sessionContext[slug].questionIndex];

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

    const next = checker.next();

    // Go directly to "Conclusion" and skip other questions
    // Only if the `sttr-checker` is the final question
    if (checker.needContactExit(question) && !next) {
      // Undo the next() with previous(), because we were already at the final question
      checker.previous();

      // Go to "Conclusion"
    } else {
      // Load the next question or go to the Result Page
      if (next) {
        // Store the new questionIndex in the session
        sessionContext.setSessionData([
          slug,
          {
            questionIndex: sessionContext[slug].questionIndex + 1,
          },
        ]);
      }
      // Go to "Next question"
    }
  };

  const onQuestionPrev = () => {
    // Load the previous question or go to "Location"
    if (checker.stack.length > 1) {
      // Store the new questionIndex in the session
      sessionContext.setSessionData([
        slug,
        {
          questionIndex: sessionContext[slug].questionIndex - 1,
        },
      ]);
    }
    // Go to "Location"
  };

  const onGoToQuestion = (questionIndex) => {
    // Go to the specific question in the stack
    checker.rewindTo(questionIndex);
    sessionContext.setSessionData([
      slug,
      {
        questionIndex,
      },
    ]);
  };

  return (
    <>
      {checker.stack.map((q, i) => {
        if (q === checker.stack[sessionContext[slug].questionIndex]) {
          return (
            <StepByStepItem
              active
              heading={q.text}
              onClick={() => onGoToQuestion(i)}
            >
              <Question
                question={q}
                key={`question-${q.id}-${i}`}
                onSubmit={onQuestionNext}
                onGoToPrev={onQuestionPrev}
                showPrev
                showNext
              />
            </StepByStepItem>
          );
        } else {
          let answer;
          if (q.options) {
            answer = q.answer;
          } else {
            const responseObj = booleanOptions.find(
              (o) => o.value === q.answer
            );
            answer = responseObj?.label;
          }
          return (
            <StepByStepItem
              checked
              heading={q.text}
              onClick={() => onGoToQuestion(i)}
            >
              <Paragraph>
                {answer?.replace(/['"]+/g, "")}
                <Button
                  style={{ marginLeft: 20 }}
                  onClick={() => onGoToQuestion(i)}
                  variant="textButton"
                >
                  Wijzig
                </Button>
              </Paragraph>
            </StepByStepItem>
          );
        }
      })}
    </>
  );
};

export default withChecker(Questions);

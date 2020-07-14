/* eslint-disable */
import React, { useContext } from "react";
import styled from "styled-components";

import { SessionContext } from "../context";
import { removeQuotes } from "../utils";
import HiddenDebugInfo from "./HiddenDebugInfo";
import { booleanOptions } from "./Question";

const QuestionSummary = ({ question: { prio, text, autofill } }) =>
  `${prio}: ${autofill ? ` [${autofill}]` : ""} ${text}`;

const Answer = ({ question: { type, answer } }) => {
  if (answer === null) {
    return "NULL???";
  }
  if (answer === undefined) {
    return "???";
  }
  if (type === "boolean") {
    return booleanOptions.find((option) => option.value === answer).label;
  }
  return answer.toString();
};

const Table = styled.table`
  th {
    text-align: left;
  }
  td,
  th {
    padding: 4px 8px;
  }
  tfoot td {
    position: relative;
  }
  tfoot td div {
    position: absolute;
    transform: rotate(90deg);
    transform-origin: bottom left;
    top: -1em;
  }
`;
const AnswerCell = styled.td``;

export default ({ checker, topic }) => {
  const sessionContext = useContext(SessionContext);
  const { slug } = topic;
  const decisionId = "dummy";
  const topicSession = sessionContext[slug] || {};

  if (!checker || !checker.permits) return <></>;
  const allQuestions = checker._getAllQuestions();
  const autofilled = allQuestions.filter((q) => q.autofill);
  const getDecisionsFromPermit = (permit) =>
    permit.getDecisionById("dummy")._inputs;

  const getRulesFromPermit = (permit) =>
    getDecisionsFromPermit(permit)
      .flatMap((decision) => decision._rules)
      .filter((rule) => rule._outputValue !== '"no hit"');

  return (
    <HiddenDebugInfo>
      {checker.permits.map((permit) => (
        <>
          <h1>{permit.name}</h1>
          {JSON.stringify(getRulesFromPermit(permit))}
          <Table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Vraag gegevens</th>
                <th>Antwoord</th>
              </tr>
            </thead>
            <tbody>
              {getRulesFromPermit(permit).map((rule) => (
                <th>{removeQuotes(rule._outputValue)}</th>
              ))}
              {getDecisionsFromPermit(permit).map((question) => (
                // <tr
                //   style={{
                //     backgroundColor:
                //       checker.stack[sessionContext[slug].questionIndex] === question
                //         ? "#ccc"
                //         : question.answer === undefined
                //         ? "white"
                //         : "#eee",
                //   }}
                // >
                //   <td>
                //     <div>{question.text}</div>
                //     {question.autofill && (
                //       <div>Autofill bron: {question.autofill}</div>
                //     )}
                //     {question.uuid && <div>Herbruikbaar id: {question.uuid}</div>}
                //     <div>Volgorde: {question.prio}</div>
                //   </td>
                //   <AnswerCell>
                //     <Answer question={question} />
                //   </AnswerCell>

                //   {/* question.rules.map(...) */}
                //   <AnswerCell>Ja</AnswerCell>
                //   <AnswerCell>Ja</AnswerCell>
                //   <AnswerCell>Ja</AnswerCell>
                //   <AnswerCell>Ja</AnswerCell>
                // </tr>
                <br />
              ))}
            </tbody>
            <tfoot>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div>Vergunninplicht</div>
              </td>
            </tfoot>
          </Table>
        </>
      ))}

      <div style={{ display: "block" }}>
        {autofilled.filter((q) => q.autofill).length > 0 && (
          <>
            <h1>Autofilled</h1>
            {autofilled.map((q) => (
              <p key={q.id}>
                <QuestionSummary question={q} />: <Answer question={q} />
              </p>
            ))}
          </>
        )}

        <h1>Stack</h1>
        <table cellPadding="1" cellSpacing="1">
          <thead>
            <tr>
              <th>Vraag</th>
              <th>Antwoord</th>
            </tr>
          </thead>
          <tbody>
            {checker.stack.map((q, i) => (
              <tr
                key={`question-${q.id}-${i}`}
                style={{
                  fontWeight:
                    checker.stack[topicSession.questionIndex] === q
                      ? "bold"
                      : "normal",
                }}
              >
                <td>
                  <QuestionSummary question={q} />
                </td>
                <td>
                  <Answer question={q} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1>Upcoming (user) questions</h1>
      <table cellPadding="1" cellSpacing="1">
        <thead>
          <tr>
            <th>Vraag</th>
            <th>Antwoord</th>
          </tr>
        </thead>
        <tbody>
          {checker._getUpcomingQuestions().map((q, i) => (
            <tr key={`open-${q.id}-${i}`}>
              <td>
                <QuestionSummary question={q} />
              </td>
              <td>
                <em>
                  <Answer question={q} />
                </em>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Permits</h1>
      {checker.permits.map((permit, index) => {
        const conclusionString = permit.getOutputByDecisionId(decisionId);
        const conclusion = permit.getDecisionById(decisionId);
        const conclusionMatchingRules = conclusion.getMatchingRules();
        const decisiveDecisions = conclusion.getDecisiveInputs();

        return (
          <div key={`${permit.name} - ${index}`}>
            <h2>{permit.name}</h2>
            {permit._decisions
              .sort(
                // loosely order decisions based on their question prios
                // doesn't matter if it's 100% correct
                (a, b) => a.getQuestions()[0]?.prio - b.getQuestions()[0]?.prio
              )
              .map((decision, i) => {
                const matchingRules = decision.getMatchingRules();
                const rules = decision._rules;
                const questions = decision._inputs;
                const decisiveInputs = decision.getDecisiveInputs();
                return (
                  <div key={`descicion - ${decision.id} ${i}`}>
                    <h3>
                      Decision {decision.id === "dummy" ? decision.id : i} (
                      {matchingRules.length !== 0 && "CONCLUSIVE"})
                    </h3>
                    <div style={{ marginLeft: "2em" }}>
                      <div>
                        <strong>Vragen</strong>
                        <ol>
                          {questions.map((q) => (
                            <li
                              key={q.id}
                              style={{
                                fontWeight:
                                  decisiveInputs.indexOf(q) > -1
                                    ? "bold"
                                    : "normal",
                              }}
                            >
                              {q.text}
                              <br />
                              Antwoord: <Answer question={q} />
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <strong>Rules:</strong>
                        <ol>
                          {rules.map((r) => {
                            return (
                              <li
                                key={r.inputConditions + r.outputValue}
                                style={{
                                  fontWeight:
                                    matchingRules.indexOf(r) > -1
                                      ? "bold"
                                      : "normal",
                                }}
                              >
                                inputConditions:{" "}
                                {JSON.stringify(r.inputConditions)}
                                <br />
                                outputValue: {r.outputValue}
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                );
              })}

            <p>
              <b>{conclusionString || <em>[unknown]</em>}</b>
              .<br />
              {decisiveDecisions.map((decision) =>
                decision.getDecisiveInputs().map((question) => question.text)
              )}
            </p>
          </div>
        );
      })}
    </HiddenDebugInfo>
  );
};

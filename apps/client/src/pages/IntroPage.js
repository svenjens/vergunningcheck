import React, { Suspense } from "react";
import { routes, geturl } from "../routes";
import withTopic from "../hoc/withTopic";

import Loading from "../components/Loading";
import Form from "../components/Form";
import Nav from "../components/Nav";
import Layout from "../components/Layouts/DefaultLayout";
import { Helmet } from "react-helmet";
import {INTRO_PAGE} from "../utils/test-ids";

const IntroPage = ({ topic }) => {
  const { text, intro } = topic;
  const Intro = React.lazy(() => import(`../intros/${intro}`));

  return (
    <Layout>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro data-testid={INTRO_PAGE}/>
      </Suspense>
      <Form action={geturl(routes.questions, topic)}>
        <Nav showNext />
      </Form>
    </Layout>
  );
};

export default withTopic(IntroPage);

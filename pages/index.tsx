import { gql, staticRequest } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { Query } from "../.tina/__generated__/types";
import type { GetStaticProps, NextPage } from "next";

const query = gql`
  {
    getPageDocument(relativePath: "home.mdx") {
      data {
        body
      }
    }
  }
`;

const Home: NextPage<{ data: Query }> = function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina<Query>({
    query,
    variables: {},
    data: props.data,
  });

  const content = data.getPageDocument.data.body;
  return (
    <Layout>
      <TinaMarkdown content={content} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const variables = {};
  let data: Query | {} = {};
  try {
    data = (await staticRequest({
      query,
      variables,
    })) as Query;
  } catch {}

  return {
    props: {
      data,
    },
  };
};

export default Home;

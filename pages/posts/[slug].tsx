import { gql, staticRequest } from "tinacms";
import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Query } from "../../.tina/__generated__/types";

const query = gql`
  query getPost($relativePath: String!) {
    getPostDocument(relativePath: $relativePath) {
      data {
        title
        body
      }
    }
  }
`;

const Home: NextPage<{ variables: { [key: string]: any }; data: Query }> =
  function Home(props) {
    const { data } = useTina<Query>({
      query,
      variables: props.variables,
      data: props.data,
    });

    return (
      <Layout>
        <h1>{data.getPostDocument.data.title}</h1>
        <TinaMarkdown content={data.getPostDocument.data.body} />
      </Layout>
    );
  };

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  const postsResponse = (await staticRequest({
    query: `{
        getPostList{
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  })) as Query;
  const paths = postsResponse.getPostList.edges!.map((x) => {
    return { params: { slug: x!.node!.sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const variables = {
    relativePath: ctx.params!.slug + ".md",
  };
  let data: Query | {} = {};
  try {
    data = (await staticRequest({
      query,
      variables,
    })) as Query;
  } catch (error) {}

  return {
    props: {
      data,
      variables,
    },
  };
};

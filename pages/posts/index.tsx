import { gql, staticRequest } from "tinacms";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import { useTina } from "tinacms/dist/edit-state";
import type { GetStaticProps, NextPage } from "next";
import type { Query } from "../../.tina/__generated__/types";

const query = gql`
  {
    getPostList {
      edges {
        node {
          id
          sys {
            filename
          }
        }
      }
    }
  }
`;

const Home: NextPage<{ data: Query }> = function Home(props) {
  const { data } = useTina<Query>({
    query,
    variables: {},
    data: props.data,
  });
  const postsList = data.getPostList.edges;
  return (
    <Layout>
      <h1>Posts</h1>
      <div>
        {postsList!.map((post) => (
          <div key={post!.node!.id}>
            <Link href={`/posts/${post!.node!.sys.filename}`}>
              <a>{post!.node!.sys.filename}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  let data: Query | {} = {};
  const variables = {};
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

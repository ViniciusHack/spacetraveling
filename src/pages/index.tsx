// import { GetStaticProps } from 'next';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  return <h1>{postsPagination.results[0].data.title}</h1>;
}

export const getStaticProps: GetStaticProps = async (): Promise<any> => {
  const prismicClient = getPrismicClient();
  const postsResponse = await prismicClient.getAllByType('post');
  // const postsResponse = await prismicClient.get({
  //   predicates: prismic.predicates.at('document.type', 'post'),
  //   fetch: ['post.title', 'post.content'],
  //   pageSize: 100,
  // });
  return {
    props: {
      postsPagination: {
        results: postsResponse,
      },
    },
    revalidate: 60 * 2,
  };
};

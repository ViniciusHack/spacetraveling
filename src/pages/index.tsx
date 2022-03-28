// import { GetStaticProps } from 'next';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';
import common from '../styles/common.module.scss';
import styles from './home.module.scss';

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
  return (
    <div className={common.container}>
      <img className={styles.logo} src="/images/Logo.svg" alt="logo" />
      {postsPagination.results.map(post => (
        <div className={styles.postContainer}>
          <Link href={`/post/${post.uid}`}>
            <a>
              <h2>{post.data.title}</h2>
            </a>
          </Link>
          <p>{post.data.subtitle}</p>
          <div className={styles.flexInfo}>
            <div>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
            </div>
            <div>
              <FiUser />
              <p>{post.data.author}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: {
    postsPagination: unknown;
  };
  revalidate: number;
}> => {
  const prismicClient = getPrismicClient();
  const postsResponse = await prismicClient.getAllByType('post');
  // const postsResponse = await prismicClient.get({
  //   predicates: prismic.predicates.at('document.type', 'post'),
  //   fetch: ['post.title', 'post.content'],
  //   pageSize: 100,
  // });
  const posts = postsResponse.map(post => {
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'PP',
        {
          locale: ptBR,
        }
      ),
    };
  });
  return {
    props: {
      postsPagination: {
        results: posts,
      },
    },
    revalidate: 60 * 2,
  };
};

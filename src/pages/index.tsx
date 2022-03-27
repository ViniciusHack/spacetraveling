// import { GetStaticProps } from 'next';
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
  console.log(postsPagination);
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
              <p>
                {new Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
                  .format(new Date(post.first_publication_date))
                  .replaceAll('de', '')
                  .replaceAll('.', '')}
              </p>
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

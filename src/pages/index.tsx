// import { GetStaticProps } from 'next';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
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
  const [currentPosts, setCurrentPosts] = useState(postsPagination.results);
  const [haveMorePosts, setHaveMorePosts] = useState(postsPagination.next_page);

  async function handleLoadMorePosts(): Promise<void> {
    const newPostResponse = await fetch(postsPagination.next_page);
    const { next_page, results: newPosts } = await newPostResponse.json();
    const formattedPosts = newPosts.map(newPost => {
      return {
        ...newPost,
        first_publication_date: format(
          new Date(newPost.first_publication_date),
          'PP',
          {
            locale: ptBR,
          }
        ),
      };
    });
    const newCurrentPosts = [...currentPosts];
    const allPosts = newCurrentPosts.concat(formattedPosts);
    setCurrentPosts(allPosts);
    setHaveMorePosts(next_page);
  }

  return (
    <div className={common.container}>
      <main className={styles.content}>
        <img className={styles.logo} src="/images/Logo.svg" alt="logo" />
        {currentPosts.map(post => (
          <div key={post.uid} className={styles.postContainer}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h2>{post.data.title}</h2>
              </a>
            </Link>
            <p>{post.data.subtitle}</p>
            <div className={styles.flexInfo}>
              <div>
                <FiCalendar />
                <time>
                  {format(new Date(post.first_publication_date), 'PP', {
                    locale: ptBR,
                  })}
                </time>
              </div>
              <div>
                <FiUser />
                <p>{post.data.author}</p>
              </div>
            </div>
          </div>
        ))}
        {!!haveMorePosts && (
          <button
            onClick={handleLoadMorePosts}
            className={styles.loadMore}
            type="button"
          >
            Carregar mais posts
          </button>
        )}
      </main>
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
  const postsResponse = await prismicClient.getByType('post', {
    pageSize: 5,
    orderings: ['document.first_publication_date desc'],
  });
  const posts = postsResponse.results.map(post => {
    return {
      ...post,
      // first_publication_date: format(
      //   new Date(post.first_publication_date),
      //   'PP',
      //   {
      //     locale: ptBR,
      //   }
      // ),
    };
  });
  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};

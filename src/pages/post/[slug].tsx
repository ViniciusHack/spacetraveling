import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import common from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
      alt: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}
export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  function getReadTime(content: any[]): string {
    return content.reduce((prev, contentProps) => {
      const teste = RichText.asText(content);
      const words = teste.split(' ');
      const total = Math.ceil(words.length / 200);
      return prev + total;
    }, 0);
  }

  return (
    <div className={styles.content}>
      <Header />
      <img src={post.data.banner.url} alt={post.data.banner.alt} />
      <main className={common.container}>
        <article key={post.data.title}>
          <h1>{post.data.title}</h1>
          <div className={styles.flexInfo}>
            <div>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
            </div>
            <div>
              <FiUser />
              <p>{post.data.author}</p>
            </div>
            <div>
              <FiClock />
              <p>{getReadTime(post.data.content)} min</p>
            </div>
          </div>
          {post.data.content.map(content => (
            <section className={styles.body}>
              <h2>{content.heading}</h2>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: String(content.body) }} />
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async (): Promise<any> => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);
  return {
    paths: [
      {
        params: {
          slug: 'como-utilizar-hooks',
        },
      },
      {
        params: {
          slug: 'criando-um-app-cra-do-zero',
        },
      },
    ],
    fallback: true,
  };
  // TODO
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{ props: unknown }> => {
  const prismicClient = getPrismicClient();
  const response = await prismicClient.getByUID(
    'post',
    String(context.params.slug)
  );
  const post = {
    /* new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
      .format(new Date(response.first_publication_date))
      .replaceAll('de', '')
      .replaceAll('.', ''), */
    first_publication_date: format(
      new Date(response.first_publication_date),
      'PP',
      {
        locale: ptBR,
      }
    ),
    data: {
      ...response.data,
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: RichText.asHtml(content.body),
        };
      }),
    },
  };
  return {
    props: {
      post,
    },
  };
};

import { GetStaticProps } from 'next';
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
  return (
    <div className={styles.content}>
      <Header />
      <img src={post.data.banner.url} alt={post.data.banner.alt} />
      <div className={common.container}>
        <h1>{post.data.title}</h1>
        <div className={styles.flexInfo}>
          <div>
            <FiCalendar />
            <p>{post.first_publication_date}</p>
          </div>
          <div>
            <FiUser />
            <p>{post.data.author}</p>
          </div>
          <div>
            <FiClock />
            <p>4 min</p>
          </div>
        </div>
        {/* Para cada content, criar uma section */}
        {post.data.content.map(postContent => (
          <section key={postContent.heading} className={styles.body}>
            <h2>{postContent.heading}</h2>
            {postContent.body.map(content => (
              <p key={content.text}>{content.text}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

export const getStaticPaths = async (): Promise<any> => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);
  return {
    paths: [],
    fallback: 'blocking',
  };
  // TODO
};

export const getStaticProps: GetStaticProps = async (context): Promise<any> => {
  const prismicClient = getPrismicClient();
  const response = await prismicClient.getByUID(
    'post',
    'criando-um-app-cra-do-zero'
  );
  // TODO
  return {
    props: {
      post: response,
    },
  };
};

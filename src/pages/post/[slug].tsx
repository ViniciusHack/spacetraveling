// import { GetStaticPaths, GetStaticProps } from 'next';

// import { getPrismicClient } from '../../services/prismic';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';
import common from '../../styles/common.module.scss';
import styles from './post.module.scss';

// interface Post {
//   first_publication_date: string | null;
//   data: {
//     title: string;
//     banner: {
//       url: string;
//     };
//     author: string;
//     content: {
//       heading: string;
//       body: {
//         text: string;
//       }[];
//     }[];
//   };
// }

// interface PostProps {
//   post: Post;
// }

export default function Post(): JSX.Element {
  return (
    <div className={styles.content}>
      <Header />
      <img src="/images/Banner.svg" alt="logo" />
      <div className={common.container}>
        <h1>Criando um app CRA do zero</h1>
        <div className={styles.flexInfo}>
          <div>
            <FiCalendar />
            <p>20 Mar 2020</p>
          </div>
          <div>
            <FiUser />
            <p>Joseph Oliveira</p>
          </div>
          <div>
            <FiClock />
            <p>4 min</p>
          </div>
        </div>
        {/* Para cada content, criar uma section */}
        <section className={styles.body}>
          <h2>Title Section #1</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dolor sapien, vulputate eu diam at, condimentum hendrerit tellus.
            Nam facilisis sodales felis, pharetra pharetra lectus auctor sed. Ut
            venenatis mauris vel libero pretium, et pretium ligula faucibus.
            Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam
            venenatis.
          </p>
        </section>
        <section className={styles.body}>
          <h2>Title Section #2</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dolor sapien, vulputate eu diam at, condimentum hendrerit tellus.
            Nam facilisis sodales felis, pharetra pharetra lectus auctor sed. Ut
            venenatis mauris vel libero pretium, et pretium ligula faucibus.
            Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam
            venenatis.
          </p>
        </section>
      </div>
    </div>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };

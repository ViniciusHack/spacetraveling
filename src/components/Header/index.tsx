import '../../styles/common.module.scss';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <a href="/">
          <img src="/images/Logo.svg" alt="logo" />
        </a>
      </div>
    </header>
  );
}

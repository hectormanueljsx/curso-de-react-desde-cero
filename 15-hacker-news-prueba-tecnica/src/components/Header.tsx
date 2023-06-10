import { container, header, link, logo } from './Header.css';

export const Header = () => {
  return (
    <nav className={header}>
      <div className={container}>
        <img className={logo} src='/y18.svg' alt='Logo de Hacker News' />
        <a className={link} href='/'>
          Hacker News
        </a>
      </div>
    </nav>
  );
};

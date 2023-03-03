import { TwitterFollowCard } from './TwitterFollowCard';
import './App.css';

const users = [
  {
    username: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true,
  },
  {
    username: 'S4vitar',
    name: 'S4vitar',
    isFollowing: false,
  },
  {
    username: 'DotCSV',
    name: 'Carlos Santana',
    isFollowing: true,
  },
  {
    username: 'DezkaReid',
    name: 'Joel Humberto Gomez Paredes',
    isFollowing: false,
  },
];

export const App = () => {
  return (
    <section className='App'>
      {users.map(({ username, name, isFollowing }) => (
        <TwitterFollowCard key={username} username={username} initialIsFollowing={isFollowing}>
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
};

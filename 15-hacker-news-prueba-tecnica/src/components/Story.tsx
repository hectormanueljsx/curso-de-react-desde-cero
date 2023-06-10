import { Link } from 'wouter';
import useSWR from 'swr';

import { StoryLoader } from './StoryLoader';
import { getItemInfo } from '../services/hacker-news';
import { getRelativeTime } from '../utilities/getRelativeTime';
import { story, storyFooter, storyHeader, storyIndex, storyLink, storyPoints, storyTitle } from './Story.css';

interface Props {
  id: number;
  index: number;
}

export const Story: React.FC<Props> = ({ id, index }) => {
  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(id));

  if (isLoading) {
    return <StoryLoader />;
  }

  const { by, kids, score, title, url, time } = data;

  let domain = '';

  try {
    domain = new URL(url).hostname.replace('www.', '');
  } catch {
    domain = 'news.ycombinator.com';
  }

  const relativeTime = getRelativeTime(time);

  return (
    <article className={story}>
      <header className={storyHeader}>
        <small className={storyIndex}>{index + 1}.</small>
        <a className={storyTitle} href={url} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
        <a className={storyLink} href={url} target='_blank' rel='noopener noreferrer'>
          ({domain})
        </a>
      </header>

      <footer className={storyFooter}>
        <span className={storyPoints}>{score} points</span>

        <Link className={storyLink} href={`/article/${id}`}>
          by {by}
        </Link>
        <Link className={storyLink} href={`/article/${id}`}>
          <time dateTime={new Date(time * 1000).toISOString()}>{relativeTime}</time>
        </Link>
        <Link className={storyLink} href={`/article/${id}`}>
          {kids?.length ?? 0} comments
        </Link>
      </footer>
    </article>
  );
};

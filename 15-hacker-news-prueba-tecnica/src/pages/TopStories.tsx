import { useEffect, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

import { Story } from '../components/Story';
import { getTopStories } from '../services/hacker-news';
import { container } from './TopStories.css';

const TopStoriesPage = () => {
  // const { data } = useSWR('stories', () => getTopStories(1, 10));

  const { data, isLoading, setSize } = useSWRInfinite(
    index => `stories/${index + 1}`,
    key => {
      const [, page] = key.split('/');
      return getTopStories(Number(page), 10);
    },
  );

  const spyEl = useRef<HTMLSpanElement>(null);

  const stories = data?.flat();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          setSize(prevSize => prevSize + 1);
        }
      },
      {
        rootMargin: '100px',
      },
    );

    if (spyEl.current == null) {
      return;
    }

    observer.observe(spyEl.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, setSize]);

  return (
    <div className={container}>
      <ul style={{ listStyle: 'none' }}>
        {stories?.map((id: number, index: number) => (
          <li style={{ display: 'flex' }} key={id}>
            <Story id={id} index={index} />
          </li>
        ))}
      </ul>

      {!isLoading && <span ref={spyEl}></span>}

      {/* <button
        onClick={() => {
          setSize(prevSize => prevSize + 1);
        }}
      >
        Load more
      </button> */}
    </div>
  );
};

export default TopStoriesPage;

import useSWR from 'swr';

import { CommentLoader } from './CommentLoader';
import { getItemInfo } from '../services/hacker-news';
import { getRelativeTime } from '../utilities/getRelativeTime';

const Comment = (props: { id: number }) => {
  const { id } = props;
  const { data, isLoading } = useSWR(`/comment/${id}`, () => getItemInfo(id));

  if (isLoading) {
    return <CommentLoader />;
  }

  const { by, text, time, kids } = data;

  const relativeTime = getRelativeTime(time);

  return (
    <>
      <details open>
        <summary>
          <small>
            <span style={{ fontWeight: 'bold' }}>{by}</span> <span>·</span> <span>{relativeTime}</span>
          </small>
        </summary>

        <p dangerouslySetInnerHTML={{ __html: text }}></p>
      </details>

      {kids?.length > 0 && <ListOfComments ids={kids.slice(0, 10)} />}
    </>
  );
};

export const ListOfComments = (props: { ids: number[] }) => {
  const { ids } = props;

  return (
    <ul style={{ listStyle: 'none' }}>
      {ids?.map((id: number) => (
        <li key={id}>
          <Comment id={id} />
        </li>
      ))}
    </ul>
  );
};

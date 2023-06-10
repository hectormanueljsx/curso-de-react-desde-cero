import useSWR from 'swr';

import { ListOfComments } from '../components/ListOfComments';
import { getItemInfo } from '../services/hacker-news';
import { container } from './Detail.css';

const DetailPage = (props: { params: { id: string } }) => {
  const {
    params: { id },
  } = props;

  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(Number(id)));

  const { kids }: { kids: number[] } = data ?? {};
  const commentIds = kids?.slice(0, 10) ?? [];

  return <div className={container}>{isLoading ? <p>Loading...</p> : <ListOfComments ids={commentIds} />}</div>;
};

export default DetailPage;

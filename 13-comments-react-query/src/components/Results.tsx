import { type CommentWithId } from '../types.d';

export const Results = ({ data }: { data?: CommentWithId[] }) => {
  return (
    <ul>
      <li className='flex flex-wrap justify-center gap-4'>
        {data?.map(comment => (
          <article
            key={comment.id}
            className={`
            ${
              comment.preview ? 'bg-gray-400' : 'bg-white'
            } block w-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100`}
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>{comment.title}</h5>
            <p className='font-normal text-gray-700'>{comment.message}</p>
          </article>
        ))}
      </li>
    </ul>
  );
};

import { type Comment, type CommentWithId } from '../types.d';

export const getComments = async (): Promise<CommentWithId[]> => {
  const url = `${import.meta.env.VITE_API_BIN_URL}/latest`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error('Error fetching comments');
    return [];
  }

  const { record: comments } = (await response.json()) as { record: CommentWithId[] };
  return comments;
};

export const postComment = async (comment: Comment) => {
  const comments = await getComments();

  const id = crypto.randomUUID();
  const newComment = { ...comment, id };
  const commentsToSave = [...comments, newComment];

  const response = await fetch(import.meta.env.VITE_API_BIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': import.meta.env.VITE_API_BIN_KEY,
    },
    body: JSON.stringify(commentsToSave),
  });

  if (!response.ok) {
    throw new Error('Failed to post comment');
  }

  return newComment;
};

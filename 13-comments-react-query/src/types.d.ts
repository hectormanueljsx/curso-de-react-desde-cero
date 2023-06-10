export interface Comment {
  preview: boolean;
  title: string;
  message: string;
  preview?: boolean;
}

export interface CommentWithId extends Comment {
  id: string;
}

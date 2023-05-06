import { type TodoList } from '../types.d';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_BIN_URL}/latest`);

  if (!res.ok) {
    console.error('Error fetching todos');
    return [];
  }

  const { record: todos } = (await res.json()) as { record: Todo[] };
  return todos;
};

export const updateTodos = async ({ todos }: { todos: TodoList }): Promise<boolean> => {
  const res = await fetch(import.meta.env.VITE_API_BIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': import.meta.env.VITE_API_BIN_KEY,
    },
    body: JSON.stringify(todos),
  });

  return res.ok;
};

import { CreateTodo } from './CreateTodo';

interface Props {
  saveTodo: (title: string) => void;
}

export const Header: React.FC<Props> = ({ saveTodo }) => {
  return (
    <header className='header'>
      <h1>
        Todo App
        <img
          style={{ width: '60px', height: 'auto', marginLeft: '10px', borderRadius: '8px' }}
          src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
        ></img>
      </h1>

      <CreateTodo saveTodo={saveTodo} />
    </header>
  );
};

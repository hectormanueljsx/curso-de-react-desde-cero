import { Badge, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react';

import { EditIcon, TrashIcon } from './Icons';
import { useAppSelector } from '../hooks/store';
import { useUserActions } from '../hooks/useUserActions';

export const ListOfUsers = () => {
  const users = useAppSelector(state => state.users);
  const { removeUser } = useUserActions();

  return (
    <Card>
      <div className='flex gap-2 mb-2 justify-center'>
        <Title>Total de Usuarios</Title>
        <Badge className='font-semibold'>{users.length}</Badge>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className='flex items-center'>
                <img
                  className='w-8 h-8 rounded-full mr-2'
                  src={`https://unavatar.io/github/${item.github}`}
                  alt={item.name}
                />
                {item.name}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <button type='button'>
                  <EditIcon />
                </button>
                <button
                  type='button'
                  onClick={() => {
                    removeUser(item.id);
                  }}
                >
                  <TrashIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

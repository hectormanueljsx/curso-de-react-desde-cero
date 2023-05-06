import { Button, Card, Grid, TextInput, Title } from '@tremor/react';
import { toast } from 'sonner';

import { useUserActions } from '../hooks/useUserActions';

export const CreateNewUser = () => {
  const { addUser } = useUserActions();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const github = formData.get('github') as string;

    if (name === '' || email === '' || github === '') {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    addUser({ name, email, github });
    toast.success('Usuario guardado correctamente');
    form.reset();
  };

  return (
    <Card className='mb-8'>
      <Title className='text-center mb-2'>Crear Nuevo Usuario</Title>

      <form onSubmit={handleSubmit}>
        <Grid numCols={1} numColsSm={2} numColsLg={3} className='gap-2'>
          <TextInput name='name' placeholder='Aquí el nombre' />
          <TextInput name='email' placeholder='Aquí el email' />
          <TextInput name='github' placeholder='Aquí el usuario de GitHub' />
        </Grid>

        <div className='flex justify-center mt-5'>
          <Button type='submit'>Crear Usuario</Button>
        </div>
      </form>
    </Card>
  );
};

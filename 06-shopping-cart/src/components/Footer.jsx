import { useFilters } from '../hooks/useFilters';

export const Footer = () => {
  const { filters } = useFilters();

  return <footer className='footer'>{JSON.stringify(filters, null, 2)}</footer>;
};

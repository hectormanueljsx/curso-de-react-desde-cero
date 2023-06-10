import ContentLoader from 'react-content-loader';

export const StoryLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={600}
      height={60}
      viewBox='0 0 600 60'
      backgroundColor='#dddddd'
      foregroundColor='#ffffff'
    >
      <rect x='0' y='0' rx='3' ry='3' width='400' height='20' />
      <rect x='410' y='0' rx='3' ry='3' width='190' height='20' />
      <rect x='0' y='30' rx='3' ry='3' width='142.5' height='20' />
      <rect x='152.5' y='30' rx='3' ry='3' width='142.5' height='20' />
      <rect x='305' y='30' rx='3' ry='3' width='142.5' height='20' />
      <rect x='457.5' y='30' rx='3' ry='3' width='142.5' height='20' />
    </ContentLoader>
  );
};

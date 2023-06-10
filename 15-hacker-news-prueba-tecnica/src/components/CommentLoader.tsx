import ContentLoader from 'react-content-loader';

export const CommentLoader = () => (
  <ContentLoader
    speed={2}
    width={600}
    height={120}
    viewBox='0 0 600 120'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='0' y='0' rx='3' ry='3' width='400' height='20' />
    <rect x='410' y='0' rx='3' ry='3' width='190' height='20' />
    <rect x='0' y='30' rx='3' ry='3' width='600' height='80' />
  </ContentLoader>
);

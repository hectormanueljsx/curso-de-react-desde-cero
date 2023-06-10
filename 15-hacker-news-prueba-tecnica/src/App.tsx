import { Suspense, lazy } from 'react';
import { Route } from 'wouter';

import { Header } from './components/Header';
const TopStoriesPage = lazy(() => import('./pages/TopStories'));
const DetailPage = lazy(() => import('./pages/Detail'));

export const App = () => {
  return (
    <>
      <Header />

      <main>
        <Suspense fallback={null}>
          <Route path='/' component={TopStoriesPage} />
          <Route path='/article/:id' component={DetailPage} />
        </Suspense>
      </main>
    </>
  );
};

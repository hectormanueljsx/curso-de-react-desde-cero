import { lazy, Suspense } from 'react';

import { Router } from './components/Router';
import { Route } from './components/Route';
import SearchPage from './pages/Search';
import Page404 from './pages/404';

const LazyHomePage = lazy(() => import('./pages/Home'));
const LazyAboutPage = lazy(() => import('./pages/About'));

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage,
  },
  {
    path: '/search/:query',
    Component: SearchPage,
  },
];

export const App = () => {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
};

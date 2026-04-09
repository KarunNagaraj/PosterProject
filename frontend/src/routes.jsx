import { createBrowserRouter } from 'react-router-dom';
import EditorPage from './components/editor/EditorPage';
import LandingPage from './components/landing/LandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/editor',
    element: <EditorPage />,
  },
]);

import { RouterProvider } from 'react-router-dom';
import { usePosterEffects } from './hooks/usePosterEffects';
import { router } from './routes';

export default function App() {
  usePosterEffects();

  return <RouterProvider router={router} />;
}

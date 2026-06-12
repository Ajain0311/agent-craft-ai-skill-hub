import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SkillsListPage } from './pages/SkillsListPage';
import { SkillDetailPage } from './pages/SkillDetailPage';
import { NewSkillPage } from './pages/NewSkillPage';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'skills',
        element: <SkillsListPage />,
      },
      {
        path: 'skills/:id',
        element: <SkillDetailPage />,
      },
      {
        path: 'skills/new',
        element: <NewSkillPage />,
      },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

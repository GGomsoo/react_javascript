import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

// lazy 함수는 실행될 때 동적으로  import하는 함수를 인자로 받는다
const BlogPage = lazy(() => import("./pages/Blog"))
const PostPage = lazy(() => import("./pages/Post"))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // BlogPage를 방문해야먄 해당 loader 가 import 되면서 '지연 로딩' 테크닉이 적용된다
          // Suspense 컴포넌트: 다른 컴포넌트에 사용하여 로딩을 기다리는데 사용할 수 있다
          {
            index: true,
            element:
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>,
            loader: () => import("./pages/Blog").then(module => module.loader())
          },
          {
            path: ':id',
            element:
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>,
            loader: (meta) => import("./pages/Post").then(module => module.loader(meta))
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

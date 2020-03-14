import Home from '../components/home/Home.jsx';
import Detail from '../components/detail/Detail.jsx';

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: '首页' },
  }, {
    path: '/detail',
    component: Detail,
    meta: { title: '详情' },
  }
];

export default routes;
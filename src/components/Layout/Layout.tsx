import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation/Navigation';

function Layout() {
  return (
    <div>
      <Navigation />
      <main style={{ paddingTop: '50px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

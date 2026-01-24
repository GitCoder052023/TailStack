import { useLocation } from 'react-router-dom';

export function useNavigation() {
  const location = useLocation();

  const isActive = (path: string, exact = true) => {
    if (exact) {
      return location.pathname === path;
    }
    if (path === '/docs') {
      return location.pathname.startsWith('/docs');
    }
    return location.pathname.startsWith(path);
  };

  return { location, isActive };
}

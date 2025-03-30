import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/logo-reading-journal.png';

export default function NavBar() {
  const { pathname } = useLocation();

  const pages = [
    {
      name: 'Sobre',
      path: '/about',
    },
    {
      name: 'Cadastrar',
      path: '/register',
    },
    {
      name: 'Livros',
      path: '/books',
    },
  ];

  return (
    <div className="flex justify-between items-center h-10 absolute left-10 right-10 top-8">
      <div className="flex justify-between w-64 text-gray-700">
        {pages.map((page, index) => (
          <NavLink
            key={index}
            to={page.path}
            title={page.name}
            className={({ isActive }) =>
              isActive
                ? 'opacity-60 cursor-not-allowed'
                : 'font-semibold cursor-pointer hover:underline hover:scale-110'
            }
          >
            {page.name}
          </NavLink>
        ))}
      </div>
      <div className='hover:scale-110'>
        {pathname !== '/' && (
          <NavLink
            to={'/'}
            title='Página inicial do Reading Journal'
          >
            <img
              src={Logo}
              alt="Logo Reading Journal"
              className="w-40 h-full object-contain"
            />
          </NavLink>
        )}
      </div>
    </div>
  );
}
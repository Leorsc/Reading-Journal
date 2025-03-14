import { NavLink } from "react-router-dom";
import useBooks from '../hooks/useBooks';


export default function NavBar() {
  const { pages } = useBooks();
  return (
    <>
      <div className="flex flex-col gap-1 absolute left-8 top-8">
        {
          pages.map((page, index) => (
            <NavLink
              key={index}
              to={page.path}
              className={({ isActive }) =>
                isActive ? 'cursor-not-allowed' : 'cursor-pointer hover:underline hover:scale-105'
              }
            >
              {page.name}
            </NavLink>
          ))
        }
      </div>
    </>
  )
}
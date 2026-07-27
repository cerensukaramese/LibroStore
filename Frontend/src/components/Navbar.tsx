import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import logo from '/src/assets/LibroStore-logo.svg';
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  if(isLoggedIn === false){
    links.splice(2,2)
  }
  return (
    <>
      <nav className="z-50 relative flex bg-purple-700 text-white px-4 py-2 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src={logo}
            alt="logo"
          />
          <h1 className="text-xl font-semibold">LibroStore</h1>
        </Link>
        <div className="nav-links-librobook flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center justify-center">
              {items.title === "Profile" ?
              <Link
              to={items.link}
              className="px-4 py-1 border border-purple-50 rounded hover:bg-purple-950 hover:text-purple-50 transition-all duration-300"
              key={i}
            >
              {items.title}
              </Link>
                 : (
                  <Link
              to={items.link}
              className="hover:text-purple-950 transition-all  duration-300"
              key={i}
            >
              {items.title}{" "}
              </Link>
            )}
              </div>
            ))}
          </div>
          {isLoggedIn === false && 
          <div className="hidden md:flex gap-4">
          <Link to="/login">
            <button className="px-4 py-1 border border-purple-50 rounded hover:bg-purple-950 hover:text-purple-50 transition-all duration-300">
              LogIn
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-1 bg-purple-50 rounded text-purple-950 hover:bg-purple-950 hover:text-purple-50 transition-all duration-300">
              SignUp
            </button>
          </Link>
        </div>}
          <button 
            className="text-white text-2xl md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="bg-purple-500 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className="hover:text-purple-950 transition-all duration-300"
                key={i}
                onClick={() => setIsMenuOpen(false)}
              >
                {items.title}
              </Link>
            ))}
            {isLoggedIn === false && (
              <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <button className="px-4 py-1 border border-purple-50 rounded hover:bg-purple-950 hover:text-purple-50 transition-all duration-300">
                LogIn
              </button>
            </Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>
              <button className="px-4 py-1 bg-purple-50 rounded text-purple-950 hover:bg-purple-950 hover:text-purple-50 transition-all duration-300">
                SignUp
              </button>
            </Link>
            </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
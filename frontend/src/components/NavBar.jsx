import NavLink from "react-router-dom";
const Navbar = () => {
  const Navlinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <nav>
      <h1>Farm2Home</h1>

      <ul>
        {
            Navlinks.map((navlink, index) =>{
                return (
                    <li>
                        
                    </li>
                )
            })
        }
      </ul>
    </nav>
  );
};

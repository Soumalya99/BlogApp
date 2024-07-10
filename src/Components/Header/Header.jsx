import React from "react";
import { Logo, Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  /** checking status to display items accordingly */
  const authStatus = useSelector(state => state.auth.status);
  console.log(authStatus);
  const navigate = useNavigate();

  /** Adding navigate array -> objects helps to add val in obj and new nav bar created automatically in production grade apps
   * authStatus = false by default rendering based on that
   */
  const navItems = [
    {
      name: "Home",
      /** slug is the path where we are redirecting to i.e. url its a fancy name afterALL */
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-4 py-2 text-sm duration-200 hover:bg-blue-600/70 hover:text-black rounded-full mr-1"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

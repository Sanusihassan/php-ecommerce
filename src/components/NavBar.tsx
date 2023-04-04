import { useState } from "react";
import content from "../../public/content/en.json";
import { Link, NavLink } from "react-router-dom";
import { store } from "../store";
type objectKey = keyof typeof content.navbar;
// type c = keyof typeof content.navbar_dropdown;
const NavBar = () => {
  let [displayDropdown, setDisplayDropdown] = useState(false);
  const NavItems = () => (
    <>
      <li className="nav-item">
        <Link
          className="nav-link text-white"
          aria-current="page"
          to="/categories"
        >
          {content.navbar.categories}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" aria-current="page" to="/items">
          {content.navbar.items}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" aria-current="page" to="/members">
          {content.navbar.members}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link text-white"
          aria-current="page"
          to="/comments"
        >
          {content.navbar.comments}
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" aria-current="page" href="#">
          {content.navbar.statistics}
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" aria-current="page" href="#">
          {content.navbar.logs}
        </a>
      </li>
    </>
  );
  return (
    <>
      {/* <div className="container"> */}
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark text-capitalize"
        data-bs-theme="dark"
      >
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav"
              style={{
                flex: "1 0 100%",
              }}
            >
              <Link className="nav-link text-white" to="/">
                {content.home_admin}
              </Link>
              <NavItems />
              <li
                className="nav-item dropdown"
                style={{
                  marginLeft: "calc(65% - 159.99px)",
                }}
              >
                <button
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setDisplayDropdown(!displayDropdown)}
                  // onBlur={() => setDisplayDropdown(false)}
                >
                  Sanusi
                </button>
                <ul
                  className={
                    displayDropdown ? "dropdown-menu show" : "dropdown-menu"
                  }
                  // style={{
                  //   display: "block",
                  //   // overflow: "hidden",
                  //   zIndex: displayDropdown ? "1000" : "-1",
                  // }}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      aria-current="page"
                      to="/edit-user?id=1"
                    >
                      {content.navbar_dropdown.edit_profile}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      aria-current="page"
                      to="/settings"
                    >
                      {content.navbar_dropdown.settings}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className="dropdown-item"
                      aria-current="page"
                      // href={store.baseUrl + "logout"}
                    >
                      {content.navbar_dropdown.logout}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* </div> */}
    </>
  );
};

export default NavBar;

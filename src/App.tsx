// import content from "../public/content/en.json";
// import Form from "./components/Form";

import { observer } from "mobx-react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditUser from "./pages/EditUser";
import AddMember from "./pages/AddMember";
import Members from "./pages/Members";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import AddItem from "./pages/AddItem";
import Items from "./pages/Items";
import EditItem from "./pages/EditItem";
import Comments from "./pages/Comments";
import EditComment from "./pages/EditComment";

function App() {
  return (
    <div className="App">
      {/* <Link to="/edit-user">Edit User</Link> */}
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* user routes */}
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/edit-user" element={<EditUser />} />
        {/* category routes */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category" element={<EditCategory />} />
        {/* item routes */}
        <Route path="/items" element={<Items />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/edit-item" element={<EditItem />} />
        {/* comments */}
        <Route path="/comments" element={<Comments />} />
        <Route path="/edit-comment" element={<EditComment />} />
      </Routes>
    </div>
  );
}

export default observer(App);

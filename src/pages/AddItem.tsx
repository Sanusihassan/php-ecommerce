import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { store } from "../store";
import axios from "axios";

type memberType = {
  id: string;
  username: string;
};
type categoryType = { id: string; name: string };
const AddItem = () => {
  const [data, setData] = useState([]);
  const [members, setMembers] = useState<memberType[]>([]);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>();
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const el = e.target as HTMLInputElement;
    let _v = {
      ...data,
      [el.name]: el.value,
    };
    setData(_v);
  };
  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    handleChange(e as unknown as React.FormEvent<HTMLInputElement>);
  };
  useEffect(() => {
    axios.get(store.baseUrl + "manage").then((res) => {
      setMembers(res.data);
    });
    axios.get(store.baseUrl + "categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
  return (
    <>
      <NavBar />
      <h1 className="text-center">Add New Item</h1>
      <div className="container">
        <form
          className="form-horizontal"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(store.baseUrl + "items", data)
              .then((res) => {
                setSuccess(res.data.message);
              })
              .catch((err) => {
                setErrors(err.response.data);
              });
          }}
        >
          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name of The Item"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Description of The Item"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Price</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                name="price"
                className="form-control"
                placeholder="Price of The Item"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Country</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Country of Made"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Status</label>
            <div className="col-sm-10 col-md-6">
              <select
                name="status"
                className="form-control"
                onChange={selectHandler}
              >
                {/* <option value="0">...</option> */}
                <option value="1">New</option>
                <option value="2">Like New</option>
                <option value="3">Used</option>
                <option value="4">Very Old</option>
              </select>
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Member</label>
            <div className="col-sm-10 col-md-6">
              <select
                name="member"
                className="form-control"
                onChange={selectHandler}
              >
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.username}
                  </option>
                ))}
                {/* <?php
									$allMembers = getAllFrom("*", "users", "", "", "UserID");
									foreach ($allMembers as $user) {
										echo "<option value='" . $user['UserID'] . "'>" . $user['Username'] . "</option>";
									}
								?> */}
              </select>
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Category</label>
            <div className="col-sm-10 col-md-6">
              <select
                name="category"
                className="form-control"
                onChange={selectHandler}
              >
                {/* <option value="0">...</option> */}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                {/* <?php
									$allCats = getAllFrom("*", "categories", "where parent = 0", "", "ID");
									foreach ($allCats as $cat) {
										echo "<option value='" . $cat['ID'] . "'>" . $cat['Name'] . "</option>";
										$childCats = getAllFrom("*", "categories", "where parent = {$cat['ID']}", "", "ID");
										foreach ($childCats as $child) {
											echo "<option value='" . $child['ID'] . "'>--- " . $child['Name'] . "</option>";
										}
									}
								?> */}
              </select>
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Tags</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                name="tags"
                className="form-control"
                placeholder="Separate Tags With Comma (,)"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <div className="col-sm-offset-2 col-sm-10 mt-2">
              <input
                type="submit"
                value="Add Item"
                className="btn btn-primary btn-sm"
              />
            </div>
          </div>
        </form>
        {errors.length > 0 &&
          errors.map((err) => (
            <div key={err} className="alert alert-danger">
              {err}
            </div>
          ))}
        {success && (
          <div className="alert alert-success text-center mt-3">{success}</div>
        )}
      </div>
    </>
  );
};

export default AddItem;

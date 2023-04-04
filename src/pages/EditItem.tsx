import axios from "axios";
import NavBar from "../components/NavBar";
import { store } from "../store";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CommentsTable from "../components/CommentsTable";

type itemType = {
  description: string;
  price: number;
  add_date: string;
  origin_country: string;
  image: null;
  status: string;
  rating: null;
  cat_id: number;
  member_id: number;
  name: string;
  cat_name: string;
  username: string;
};

type membertype = {
  username: string;
  password: string;
  email: string;
  full_name: string;
  group_id: number;
  trust_status: number;
  reg_status: number;
  reg_date: string;
  id: string | number;
};

type categoryType = {
  id: number;
  name: string;
  description: string;
  ordering: number;
  visibility: number;
  allow_comment: number;
  allow_ads: number;
};

const EditItem = () => {
  const [data, setData] = useState<itemType>({} as itemType);
  const [members, setMembers] = useState<membertype[]>([]);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let el = e.target as HTMLInputElement;
    let _v: itemType = {
      ...data,
      [el.name]: el.value,
    };
    setData(_v);
  };
  let id = query.get("id");
  useEffect(() => {
    axios.get(store.baseUrl + "item?id=" + id).then((res) => {
      setData(res.data);
    });
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
      <div className="container">
        <h1 className="text-center">Edit Item</h1>
        <form
          className="form-horizontal"
          style={{
            margin: "auto",
          }}
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(store.baseUrl + "edit-item", data)
              .then((res) => {
                console.log(res);
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
                required
                placeholder="Name of The Item"
                value={data.name}
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
                required
                placeholder="Description of The Item"
                value={data.description}
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
                required
                placeholder="Price of The Item"
                value={data.price}
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
                required
                placeholder="Country of Made"
                value={data.origin_country}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* status field */}
          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Status</label>
            <div className="col-sm-10 col-md-6">
              <select
                name="status"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange(
                    e as unknown as React.ChangeEvent<HTMLInputElement>
                  )
                }
              >
                <option value="1" selected={data.status === "1"}>
                  New
                </option>
                <option value="2" selected={data.status === "2"}>
                  Like New
                </option>
                <option value="3" selected={data.status === "3"}>
                  Used
                </option>
                <option value="4" selected={data.status === "4"}>
                  Very Old
                </option>
              </select>
            </div>
          </div>
          {/* members */}
          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Member</label>
            <div className="col-sm-10 col-md-6">
              <select
                name="member_id"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange(
                    e as unknown as React.ChangeEvent<HTMLInputElement>
                  )
                }
              >
                {members.map((member) => (
                  <option
                    value={member.id}
                    key={member.id}
                    selected={data.member_id == member.id}
                  >
                    {member.username}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* categories */}
          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Category</label>
            <div className="col-sm-10 col-md-6">
              <select name="category_id">
                {categories.map((category) => (
                  <option
                    value={category.id}
                    key={category.id}
                    selected={data.cat_id === category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group form-group-lg">
            <div className="col-sm-offset-2 col-sm-10">
              <input
                type="submit"
                value="Add Item"
                className="btn btn-primary btn-lg"
              />
            </div>
          </div>
        </form>
        <CommentsTable
          stuff={["comment", "username", "added_date"]}
          id={id as string}
        />
        {success && <div className="alert alert-success">{success}</div>}
        {errors.map((err) => (
          <div className="alert alert-danger">{err}</div>
        ))}
      </div>
    </>
  );
};

export default EditItem;

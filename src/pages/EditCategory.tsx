import { useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { store } from "../store";
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
type bool = string | boolean;
type dataType = {
  ads?: bool;
  commenting?: bool;
  description?: string | null;
  name?: string;
  ordering?: string | null;
  visibility?: bool;
};
const EditCategory = () => {
  let query = useQuery();
  const [data, setData] = useState<dataType>();
  const [err, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let _v: dataType = {
      ...data,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    };
    setData({
      commenting: true,
      ads: true,
      ..._v,
    });
  };
  const radioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let el = e.target as HTMLInputElement;
    let checked = /-yes/g.test(el.id);
    setData({
      ...data,
      [e.target.name]: checked ? "1" : "0",
    });
  };
  let _id = query.get("id");
  useEffect(() => {
    _id = query.get("id");
    axios
      .get(store.baseUrl + "category?id=" + _id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-center">Edit Category</h1>
        <form
          className="form-horizontal"
          style={{
            margin: "auto",
          }}
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(store.baseUrl + "update-category", {
                ...data,
                _id,
              })
              .then((res) => {
                setError("");
                setSuccess(res.data.message);
              })
              .catch((err) => {
                setError(err.response.data.message);
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
                autoComplete="off"
                required
                placeholder="Name Of The Category"
                value={data?.name}
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
                value={data?.description as string | number}
                className="form-control"
                placeholder="Describe The Category"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Ordering</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                name="ordering"
                className="form-control"
                placeholder="Number To Arrange The Categories"
                value={data?.ordering as string | number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Parent?</label>
            <div className="col-sm-10 col-md-6">
              <select name="parent">
                <option value="0">None</option>
              </select>
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Visible</label>
            <div className="col-sm-10 col-md-6">
              <div>
                <input
                  id="vis-yes"
                  type="radio"
                  name="visibility"
                  checked={data?.visibility == "1" ? true : false}
                  onChange={radioChangeHandler}
                />
                <label htmlFor="vis-yes">Yes</label>
              </div>
              <div>
                <input
                  id="vis-no"
                  type="radio"
                  name="visibility"
                  checked={data?.visibility == "0" ? true : false}
                  onChange={radioChangeHandler}
                />
                <label htmlFor="vis-no">No</label>
              </div>
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Allow Commenting</label>
            <div className="col-sm-10 col-md-6">
              <div>
                <input
                  id="com-yes"
                  type="radio"
                  name="commenting"
                  onChange={radioChangeHandler}
                  checked={data?.commenting == "1" ? true : false}
                />
                <label htmlFor="com-yes">Yes</label>
              </div>
              <div>
                <input
                  onChange={radioChangeHandler}
                  id="com-no"
                  type="radio"
                  name="commenting"
                  checked={data?.commenting == "0" ? true : false}
                />
                <label htmlFor="com-no">No</label>
              </div>
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Allow Ads</label>
            <div className="col-sm-10 col-md-6">
              <div>
                <input
                  onChange={radioChangeHandler}
                  id="ads-yes"
                  type="radio"
                  name="ads"
                  checked={data?.ads == "1" ? true : false}
                />
                <label htmlFor="ads-yes">Yes</label>
              </div>
              <div>
                <input
                  onChange={radioChangeHandler}
                  id="ads-no"
                  type="radio"
                  name="ads"
                  checked={data?.ads != "1" ? true : false}
                />
                <label htmlFor="ads-no">No</label>
              </div>
            </div>
          </div>

          <div className="form-group form-group-lg">
            <div className="col-sm-offset-2 col-sm-10">
              <input
                type="submit"
                value="Add Category"
                className="btn btn-primary btn-lg"
              />
            </div>
          </div>
        </form>
        {success && <div className="alert alert-success">{success}</div>}
        {err && <div className="alert alert-danger">{err}</div>}
      </div>
    </>
  );
};

export default EditCategory;

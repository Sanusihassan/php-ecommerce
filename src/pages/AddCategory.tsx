import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { store } from "../store";
type dataType = {
  ads?: string;
  commenting?: string;
  description?: string;
  name?: string;
  ordering?: string;
  visibility?: string;
};
const AddCategory = () => {
  const [data, setData] = useState<dataType>();
  const [err, setErr] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let _v: dataType = {
      ...data,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    };
    setData(_v);
  };
  const radioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let el = e.target as HTMLInputElement;
    let checked = /-yes/g.test(el.id);
    setData({
      ...data,
      [e.target.name]: checked ? "1" : "0",
    });
  };

  return (
    <>
      <NavBar />
      <h1 className="text-center">Add New Category</h1>
      <div className="container">
        <form
          className="form-horizontal"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(store.baseUrl + "category", data)
              .then((res) => {
                console.log(res);
                setErr("");
                setSuccess(res.data.message);
              })
              .catch((err) => {
                setErr(err.response.data.message);
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
                  defaultChecked
                  onChange={radioChangeHandler}
                />
                <label htmlFor="vis-yes">Yes</label>
              </div>
              <div>
                <input
                  id="vis-no"
                  type="radio"
                  name="visibility"
                  value="1"
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
                  defaultChecked
                  onChange={radioChangeHandler}
                />
                <label htmlFor="com-yes">Yes</label>
              </div>
              <div>
                <input
                  onChange={radioChangeHandler}
                  id="com-no"
                  type="radio"
                  name="commenting"
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
                  defaultChecked
                />
                <label htmlFor="ads-yes">Yes</label>
              </div>
              <div>
                <input
                  onChange={radioChangeHandler}
                  id="ads-no"
                  type="radio"
                  name="ads"
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
        {err && (
          <div className="text-center text-capitalize alert alert-warning mt-3">
            {err}
          </div>
        )}
        {success && (
          <div className="text-center text-capitalize alert alert-success mt-3">
            {success}
          </div>
        )}
      </div>
    </>
  );
};

export default AddCategory;

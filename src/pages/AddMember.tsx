import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { store } from "../store";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const [data, setData] = useState({
    email: "",
    full: "",
    username: "",
    password: "",
  });
  const [timerId, setTimerId] = useState<number>();
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);
  let [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let _v = {
      ...data,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    };
    setData(_v);
  };
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <h1 className="text-center">Add New Member</h1>
      <div className="container">
        <form
          className="form-horizontal"
          method="POST"
          encType="multipart/form-data"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              let res = (await axios.post(store.baseUrl + "insert", data)).data;
              const id = setTimeout(() => {
                console.log("hello");
                navigate(-1);
              }, 1000);
              setTimerId(id);
              setSuccessMessage(res.message);
            } catch (err) {
              let errs = (err as { response: { data: string[] } }).response
                ?.data;
              // console.log(errs);
              errs = typeof errs === "string" ? [] : errs;
              setErrors(errs || []);
            }
          }}
        >
          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Username</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                name="username"
                className="form-control"
                autoComplete="off"
                // required
                onChange={handleChange}
                placeholder="Username To Login Into Shop"
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="password"
                name="password"
                className="password form-control"
                // required
                autoComplete="off"
                onChange={handleChange}
                placeholder="Password Must Be Hard & Complex"
              />
              <i className="show-pass fa fa-eye fa-2x"></i>
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="email"
                name="email"
                className="form-control"
                // required
                onChange={handleChange}
                placeholder="Email Must Be Valid"
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Full Name</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                name="full"
                className="form-control"
                // required
                onChange={handleChange}
                placeholder="Full Name Appear In Your Profile Page"
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">User Avatar</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="file"
                name="avatar"
                className="form-control"
                onChange={handleChange}
                // required
              />
            </div>
          </div>

          <div className="form-group form-group-lg">
            <div className="col-sm-offset-2 col-sm-10">
              <input
                type="submit"
                value="Add Member"
                className="btn btn-primary btn-lg"
              />
              {successMessage && (
                <div
                  className={
                    successMessage.includes("SQLSTATE[23000]:")
                      ? "mt-1 alert text-center alert-warning"
                      : "mt-1 alert text-center alert-success"
                  }
                >
                  {successMessage.includes("SQLSTATE[23000]:")
                    ? "User Already Exists"
                    : successMessage}
                </div>
              )}
            </div>
            {errors.map((err, i) => (
              <div className="alert alert-danger mt-2 text-center" key={i}>
                {err}
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMember;

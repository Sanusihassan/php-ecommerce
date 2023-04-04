import { useEffect, useRef, useState, useReducer, useMemo } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
// import "./_edit-user.scss";
import axios from "axios";
import { store } from "../store";
type _d = {
  username: string;
  email: string;
  password?: string;
  oldpassword?: string;
  newpassword?: string;
};
type dataAction = { type: "update"; payload?: any };
const initialState = {
  username: "",
  email: "",
  password: "",
  oldpassword: "",
  newpassword: "",
};

import { useLocation } from "react-router-dom";
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
const EditUser = () => {
  let query = useQuery();
  let oldPasswordRef = useRef(null);
  let newPasswordRef = useRef(null);
  // let redirector = useRef(null);
  let [oldpassword, setOldPass] = useState("");
  let [newpassword, setNewPass] = useState("");
  let [errors, setErrors] = useState({});
  const [timerId, setTimerId] = useState<number>();
  const navigate = useNavigate();
  function reducer(state: _d, action: dataAction, initialState: _d): _d {
    switch (action.type) {
      case "update":
        return action.payload;
    }
  }
  const [state, dispatch] = useReducer(
    reducer as React.Reducer<any, any>,
    initialState
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let _v = {
      ...state,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    };
    dispatch({ type: "update", payload: _v });
  };

  const setPasswords = () => {
    setOldPass((oldPasswordRef?.current as unknown as HTMLInputElement)?.value);
    setNewPass((newPasswordRef?.current as unknown as HTMLInputElement)?.value);
  };
  let [successMessage, setSuccessMessage] = useState(null);
  useEffect(() => {
    let id = query.get("id");
    setPasswords();
    (async () => {
      const _v = (await axios.get(store.baseUrl + "members?id=" + id)).data;
      dispatch({
        type: "update",
        payload: { ...state, ..._v, oldpassword, newpassword },
      });
    })();
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (
    <div className="edit-user">
      <NavBar />
      <div className="container">
        <h1 className="text-center">Edit Member</h1>
        <div className="container">
          <form
            className="form-horizontal"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(state);
              // axios
              //   .post(store.baseUrl + "update", state)
              //   .then((response) => {
              //     // console.log(response);
              //     setErrors({});
              //     setSuccessMessage(response.data.message);
              //     const id = setTimeout(() => {
              //       console.log("hello");
              //       navigate(-1);
              //     }, 2000);
              //     setTimerId(id);
              //   })
              //   .catch((error) => {
              //     setErrors(error.response.data);
              //   });
            }}
          >
            {/* <input type="hidden" name="userid" value="<?php echo $userid ?>" /> */}

            <div className="form-group form-group-lg">
              <label className="col-sm-10 col-md-6  control-label">
                Username
              </label>
              <div className="col-sm-10 col-md-6">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  autoComplete=""
                  required
                  value={state?.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-group-lg">
              <label className="col-sm-10 col-md-6  control-label">
                Password
              </label>
              <div className="col-sm-10 col-md-6">
                <input
                  type="hidden"
                  name="oldpassword"
                  value={oldpassword || state.password}
                  ref={oldPasswordRef}
                />
                <input
                  type="password"
                  ref={newPasswordRef}
                  name="newpassword"
                  className="form-control"
                  autoComplete=""
                  placeholder="Leave Blank If You Dont Want To Change"
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group form-group-lg">
              <label className="col-sm-10 col-md-6  control-label">Email</label>
              <div className="col-sm-10 col-md-6">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-group-lg">
              <label className="col-sm-10 col-md-6  control-label">
                Full Name
              </label>
              <div className="col-sm-10 col-md-6">
                <input
                  type="text"
                  name="full"
                  className="form-control"
                  required
                  value={state.full}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-group-lg mt-2">
              <div className="col-sm-offset-2 col-sm-10 col-md-6">
                <button className="btn btn-primary btn-lg submit">Save</button>
                {successMessage && (
                  <div className="alert alert-success text-center">
                    {successMessage}
                  </div>
                )}
                {Object.keys(errors).map((err) => (
                  <div
                    className="alert alert-danger mt-2 text-center"
                    key={err}
                  >
                    {errors[err as keyof typeof errors]}
                  </div>
                ))}
              </div>
            </div>
          </form>
          {/* <Link ref={redirector} to="/members" /> */}
        </div>
      </div>
    </div>
  );
};

export default EditUser;

import { useState } from "react";
import axios from "axios";
import { store } from "../store";

const Form = () => {
  let [data, setData] = useState({});

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setData({
      ...data,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  return (
    <>
      <style>
        {`
        form.login {
          text-align: center;
          width: 50%;
          margin: 0 auto
        }
        `}
      </style>
      <form
        method="POST"
        className="login mt-3"
        onSubmit={async (e) => {
          e.preventDefault();
          let res = (await axios.post(store.baseUrl, data)).data;

          console.log(res);
        }}
      >
        <h4>Admin Login</h4>
        <input
          type="text"
          name="username"
          className="form-control"
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
        />
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;

import { Link } from "react-router-dom";

type _t = {
  name: string;
  addHandler?: string;
};
const NoItemMsg = ({ name, addHandler }: _t) => {
  return (
    <>
      <div className="container">
        <div className="alert alert-primary mt-3 text-bold text-center text-capitalize">
          There are no {name} to show
          {addHandler ? (
            <Link to={addHandler}>
              {" "}
              Create a new{" "}
              {name != "categories" ? name.replace(/s$/, "") : "category"}{" "}
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default NoItemMsg;

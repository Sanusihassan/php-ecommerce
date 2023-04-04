import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { store } from "../store";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon, PlusIcon, SortIcon } from "../icons/Icons";
import { Link } from "react-router-dom";
import NoItemMsg from "../components/NoItemMsg";

type _d = {
  id: number;
  name: string;
  description: string | null;
  ordering: string | null;
  visibility: number;
  allow_comment: number;
  allow_ads: number;
};
type sortOrder = "ASC" | "DESC";
const Categories = () => {
  let [data, setData] = useState<_d[]>([]);
  let [success, setSuccess] = useState<string | null>();
  let [err, setErr] = useState<string | null>();
  const [order, setOrder] = useState<sortOrder>("ASC");
  const [render, reRender] = useState(false);
  useEffect(() => {
    axios.get(store.baseUrl + "categories?sort_order=" + order).then((res) => {
      setData(res.data);
    });
  }, [render]);
  return (
    <>
      <NavBar />
      {data.length ? (
        <>
          <h1 className="text-center">Manage Categories</h1>
          <div className="container categories">
            <div className="panel panel-default">
              <div className="panel-heading">
                <EditIcon /> Manage Categories
                <div className="option pull-right">
                  <SortIcon /> Ordering: [
                  <button
                    className={
                      order == "ASC"
                        ? "active btn btn-default"
                        : "btn btn-default"
                    }
                    onClick={() => {
                      setOrder("ASC");
                      reRender(!render);
                    }}
                  >
                    Asc
                  </button>{" "}
                  |
                  <button
                    className={
                      order == "DESC"
                        ? "active btn btn-default"
                        : "btn btn-default"
                    }
                    onClick={() => {
                      setOrder("DESC");
                      reRender(!render);
                    }}
                  >
                    Desc
                  </button>{" "}
                  ]
                </div>
              </div>
              <div className="panel-body">
                {/* <div className="cat"></div> */}
                {data.map((item) => (
                  <div className="cat" key={item.id}>
                    <div className="hidden-buttons">
                      <Link
                        to={`/edit-category?id=${item.id}`}
                        className="btn btn-xs btn-primary"
                      >
                        edit <EditIcon />
                      </Link>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this item?"
                            )
                          ) {
                            axios
                              .get(
                                store.baseUrl + "delete-category?id=" + item.id
                              )
                              .then((res) => {
                                setSuccess(res.data.message);
                                // delete category from front end
                                data = data.filter((d) => d.id !== item.id);
                              })
                              .catch((err) => {
                                setErr(err.response.data.message);
                              });
                          }
                        }}
                        className="btn btn-xs btn-danger"
                      >
                        delete <DeleteIcon />
                      </button>
                    </div>
                    <h3>{item.name}</h3>
                    {item.description && <p>{item.description}</p>}
                    <div className="d-flex mb-2 justify-content-between w-50">
                      <span className="visibility text-white cat-span">
                        visibility is {item.visibility}
                      </span>
                      <span className="commenting text-white cat-span">
                        allow comment is {item.allow_comment}
                      </span>
                      <span className="advertises text-white cat-span">
                        allow ads is {item.allow_ads}
                      </span>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            {success && <div className="alert alert-success">{success}</div>}
            {err && <div className="alert alert-danger">{err}</div>}
            <Link
              className="add-category btn btn-primary mt-3"
              to="/add-category"
            >
              <PlusIcon /> Add New Category
            </Link>
          </div>
        </>
      ) : null}
      {!data.length ? (
        <NoItemMsg name="categories" addHandler="/add-category" />
      ) : null}
    </>
  );
};

export default Categories;

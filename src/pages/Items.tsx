import { Link } from "react-router-dom";
import { ActivateIcon, DeleteIcon, PlusIcon } from "../icons/Icons";
import { EditIcon } from "../icons/EditIcon";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { store } from "../store";
import axios from "axios";

type strInt = string | number;
type itemType = {
  id: strInt;
  description: string;
  price: strInt;
  add_date: string;
  origin_country: string;
  image?: string | null;
  status: strInt;
  rating: string | null;
  cat_id: strInt;
  member_id: strInt;
  name: string;
  username: string;
  cat_name: string;
  approve: string;
};
// function to delete item from database

const ManageItems = () => {
  const [items, setItems] = useState<itemType[]>();
  const [tree, rerender] = useState(false);
  const [success, setSuccess] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios.get(store.baseUrl + "items").then((res) => {
      setItems(res.data);
    });
  }, [tree]);
  return (
    <>
      <NavBar />
      <section className="container">
        <h1 className="text-center">Manage Items</h1>

        <div className="table-responsive">
          <table className="main-table manage-members text-center table table-bordered">
            <thead>
              <tr>
                <td>#ID</td>
                <td>name</td>
                <td>description</td>
                <td>price</td>
                <td>category</td>
                <td>username</td>
                <td>Insert Date</td>
                <td>Control</td>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.cat_name}</td>
                  <td>{item.username}</td>
                  <td>{item.add_date}</td>

                  <td>
                    <Link
                      className="btn bg-success btn-success"
                      to={"/edit-item?id=" + item.id}
                    >
                      <EditIcon /> Edit
                    </Link>{" "}
                    {/* <button onClick={() => {
                        if(deleteRef.current) {
                          deleteRef.current.click();
                        }
                      }}>
                      
                      </button> */}
                    <button
                      onClick={(e) => {
                        if (confirm("Are you sure you want to delete")) {
                          axios
                            .get(`${store.baseUrl}delete-item?id=${item.id}`)
                            .then((response) => {
                              rerender(!tree);
                            });
                        }
                      }}
                      // to={``}
                      className="btn bg-danger btn-danger confirm"
                    >
                      <DeleteIcon /> Delete
                    </button>{" "}
                    {item?.approve == "0" && (
                      <button
                        className="btn text-white btn-info"
                        onClick={(e) => {
                          axios
                            .get(store.baseUrl + "approve-item?id=" + item.id)
                            .then((res) => {
                              setSuccess(res.data.message);
                              setCount(count + 1);
                              rerender(!tree);
                            })
                            .catch((err) => {
                              console.log(err.response.data);
                            });
                        }}
                      >
                        <ActivateIcon /> Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <a href="members.php?do=Add" className="btn btn-primary">
            New Member
          </a> */}
        {success && (
          <div className="text-center alert alert-success">
            {count} {success}
          </div>
        )}

        <Link to="/add-item" className="btn btn-primary">
          <PlusIcon />
          Add New Item
        </Link>
      </section>
    </>
  );
};

export default ManageItems;

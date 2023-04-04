import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { store } from "../store";
type m = {
  id: string;
  username: string;
  password: string;
  email: string;
  full_name: string;
  group_id: string;
  trust_status: string;
  reg_status: string;
  [k: string]: any;
};

import { EditIcon } from "../icons/EditIcon";
import { ActivateIcon, DeleteIcon, PlusIcon } from "../icons/Icons";
import NoItemMsg from "../components/NoItemMsg";

const Members = () => {
  const [members, setMembers] = useState<m[]>([]);
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false);
  useEffect(() => {
    axios.get(store.baseUrl + "manage").then((res) => {
      setMembers((res.data satisfies m) ? res.data : []);
    });
  }, [deleteTrigger]);
  return (
    <>
      <style>{`
      .btn.bg-success:hover {
        background: #157347 !important;
      }
      .btn.bg-danger:hover {
        background: #bb2d3b !important;
      }
    `}</style>
      <div className="members">
        <NavBar />
        {members.length ? (
          <div className="container">
            <h1 className="text-center">Manage Members</h1>
            <div className="container">
              <div className="table-responsive">
                <table className="main-table manage-members text-center table table-bordered">
                  <thead>
                    <tr>
                      <td>#ID</td>
                      {/* <td>Avatar</td> */}
                      <td>Username</td>
                      <td>Email</td>
                      <td>Full Name</td>
                      <td>Registered Date</td>
                      <td>Control</td>
                    </tr>
                  </thead>
                  <tbody>
                    {members?.map((member: m) => (
                      <tr key={member.id}>
                        <td>{member.id}</td>
                        <td>{member.username}</td>
                        <td>{member.email}</td>
                        <td>{member.full_name}</td>
                        <td>
                          {new Date(member.reg_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </td>

                        <td>
                          <Link
                            className="btn bg-success btn-success"
                            to={"/edit-user?id=" + member.id}
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
                            // ref={deleteRef}
                            onClick={(e) => {
                              if (!confirm("Are you sure you want to delete")) {
                                // e.preventDefault();
                              } else {
                                axios
                                  .get(`${store.baseUrl}delete?id=${member.id}`)
                                  .then((response) => {
                                    setDeleteTrigger(!deleteTrigger);
                                  });
                              }
                            }}
                            // to={``}
                            className="btn bg-danger btn-danger confirm"
                          >
                            <DeleteIcon /> Delete
                          </button>{" "}
                          {member?.reg_status == "0" && (
                            <button
                              className="btn text-white btn-info"
                              onClick={(e) => {
                                axios
                                  .get(
                                    store.baseUrl + "activate?id=" + member.id
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => {
                                    console.log(err.response.data);
                                  });
                              }}
                            >
                              <ActivateIcon /> Activate
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
            </div>
            <Link to="/add-member" className="btn btn-primary">
              <PlusIcon />
              Add New Member
            </Link>
          </div>
        ) : null}
        {!members.length && (
          <NoItemMsg name="members" addHandler="/add-member" />
        )}
      </div>
    </>
  );
};

export default Members;

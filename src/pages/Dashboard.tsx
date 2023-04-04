import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { store } from "../store";
import { Link } from "react-router-dom";
import { EditIcon } from "../icons/EditIcon";
import {
  ActivateIcon,
  ChatIcon,
  PlusIcon,
  Tag,
  UserPlus,
  UsersIcon,
} from "../icons/Icons";
type user = {
  username: string;
  password: string;
  email: string;
  full_name: string;
  group_id: number;
  trust_status: number;
  reg_status: number;
  reg_date: string;
  id: string;
};
type item = {
  description: string;
  price: number;
  add_date: string;
  origin_country: string;
  status: number;
  rating: null;
  cat_id: number;
  member_id: number;
  name: string;
  approve: number;
  cat_name: string;
  username: string;
  id: number;
};
type comment = {
  id: number;
  comment: string;
  status: number;
  comment_date: string;
  item_id: number;
  user_id: number;
  item_name: string;
  username: string;
};
type dashBoardData = {
  items_count: number;
  pending_members: string;
  latest_users: user[];
  latest_items: item[];
  latest_comments: comment[];
  [key: string]: any;
};
const Dashboard = () => {
  const IconStyles = {
    width: "1em",
    height: "1em",
  };

  let [data, setData] = useState<dashBoardData>();
  const [tree, rerender] = useState(false);
  useEffect(() => {
    axios.get(store.baseUrl + "dashboard").then((response) => {
      setData(response.data);
    });
  }, [tree]);
  return (
    <>
      <NavBar />
      <div className="home-stats">
        <div className="container text-center">
          <h1>Dashboard</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="stat st-members">
                <UsersIcon />

                <div className="info">
                  Total Members
                  <span>
                    <Link to="/members?page=pending">{data?.users_count}</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat st-pending">
                <UserPlus />
                <div className="info">
                  Pending Members
                  <span>
                    <a href="members.php?do=Manage&page=Pending">
                      {data?.pending_members}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat st-items">
                <Tag />
                <div className="info">
                  Total Items
                  <span>
                    <Link to="/items">{data?.items_count}</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat st-comments">
                <ChatIcon />
                <div className="info">
                  Total Comments
                  <span>
                    <Link to="comments">
                      {data?.latest_comments.length || 0}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="latest">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <UserPlus /> Latest {data?.latest_users.length} Registerd
                  Users
                  <span className="toggle-info pull-right">
                    <PlusIcon />
                  </span>
                </div>
                <div className="panel-body">
                  <ul className="list-unstyled latest-users">
                    {data?.latest_users.map((item) => (
                      <li key={item.username}>
                        {item.username}{" "}
                        <Link
                          to={"/edit-user?id=" + item.id}
                          className="btn btn-success pull-right"
                        >
                          edit <EditIcon />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <Tag /> Latest {data?.latest_items.length} Items
                  <span className="toggle-info pull-right">
                    <PlusIcon />
                  </span>
                </div>
                <div className="panel-body">
                  <ul className="list-unstyled latest-users">
                    {data?.latest_items.map((item) => (
                      <li key={item.id}>
                        {item.name}{" "}
                        <Link
                          to={"/edit-item?id=" + item.id}
                          className="btn btn-success pull-right"
                        >
                          edit <EditIcon />
                        </Link>
                        {item?.approve == 0 && (
                          <button
                            className="btn text-white btn-info"
                            onClick={(e) => {
                              axios
                                .get(
                                  store.baseUrl + "approve-item?id=" + item.id
                                )
                                .then((_) => {
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
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6 latest">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <Tag /> Latest {data?.latest_comments.length} Comments
                  <span className="toggle-info pull-right">
                    <PlusIcon />
                  </span>
                </div>
                <div className="panel-body mt-3 comment-box">
                  <ul className="list-unstyled latest-comments">
                    {data?.latest_comments.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={"/edit-user?id=" + item.user_id}
                          className="member-n"
                        >
                          {item.username}
                        </Link>
                        <p className="member-c">{item?.comment}</p>
                        <Link
                          to={"/edit-comment?id=" + item.id}
                          className="btn btn-success pull-right"
                        >
                          edit <EditIcon />
                        </Link>
                        {/* {item?.approve == 0 && (
                          <button
                            className="btn text-white btn-info"
                            onClick={(e) => {
                              axios
                                .get(
                                  store.baseUrl + "approve-item?id=" + item.id
                                )
                                .then((_) => {
                                  rerender(!tree);
                                })
                                .catch((err) => {
                                  console.log(err.response.data);
                                });
                            }}
                          >
                            <ActivateIcon /> Approve
                          </button>
                        )} */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import axios from "axios";
import { store } from "../store";
import { DeleteIcon } from "../icons/Icons";
import { EditIcon } from "../icons/EditIcon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
type commentType = {
  id: number;
  comment: string;
  status: number;
  comment_date: string;
  item_id: number;
  user_id: number;
  item_name: string;
  username: string;
};

const CommentsTable = ({
  stuff,
  id,
}: {
  stuff?: string[];
  id?: string | number;
}) => {
  const [data, setData] = useState<commentType[]>([]);
  const [comments, setComment] = useState<commentType[]>([]);
  const [tree, rerender] = useState(false);
  useEffect(() => {
    store.setWeGotComments(true);
    if (!stuff) {
      axios
        .get(store.baseUrl + "comments")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          store.setWeGotComments(false);
        });
    } else {
      axios
        .get(store.baseUrl + "get-commnet-by-item-id?id=" + id)
        .then((res) => {
          setComment(res.data);
        })
        .catch((err) => {
          store.setWeGotComments(false);
        });
    }
  }, [tree]);
  return (
    <>
      {store.weGotComments ? (
        <div className="table-responsive">
          {comments.length ? (
            <h2 className="h1 text-center">
              Manage [ {comments[0]?.item_name} ] Comments
            </h2>
          ) : null}
          <table className="main-table manage-members text-center table table-bordered table-hover">
            <thead>
              <tr>
                {!stuff && (
                  <>
                    <td>#ID</td>
                    <td>comment</td>
                    <td>item name</td>
                    <td>username</td>
                    <td>added date</td>
                  </>
                )}
                {stuff && stuff?.map((item) => <td key={item}>{item}</td>)}

                <td>Control</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.comment}</td>
                  <td>{item.item_name}</td>
                  <td>{item.username}</td>
                  <td>{item.comment_date}</td>
                  <td>
                    <Link
                      className="btn bg-success btn-success"
                      to={"/edit-comment?id=" + item.id}
                    >
                      <EditIcon /> Edit
                    </Link>{" "}
                    <button
                      onClick={(e) => {
                        if (confirm("Are you sure you want to delete")) {
                          axios
                            .get(`${store.baseUrl}delete-comment?id=${item.id}`)
                            .then((res) => {
                              console.log(res.data);
                              rerender(!tree);
                            });
                        }
                      }}
                      className="btn bg-danger btn-danger confirm"
                    >
                      <DeleteIcon /> Delete
                    </button>{" "}
                  </td>
                </tr>
              ))}
              {comments.map((item) => (
                <tr>
                  <td key={item.id}>{item.comment}</td>
                  <td key={item.id}>{item.username}</td>
                  <td key={item.id}>{item.comment_date}</td>
                  <td>
                    <Link
                      className="btn bg-success btn-success"
                      to={"/edit-comment?id=" + item.id}
                    >
                      <EditIcon /> Edit
                    </Link>{" "}
                    <button
                      onClick={(e) => {
                        if (confirm("Are you sure you want to delete")) {
                          axios
                            .get(`${store.baseUrl}delete-comment?id=${item.id}`)
                            .then((res) => {
                              console.log(res.data);
                              rerender(!tree);
                            });
                        }
                      }}
                      className="btn bg-danger btn-danger confirm"
                    >
                      <DeleteIcon /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default CommentsTable;

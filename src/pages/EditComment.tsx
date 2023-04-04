import { useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { store } from "../store";

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

const EditComment = () => {
  const [data, setData] = useState<commentType>({} as commentType);
  const [success, setSuccess] = useState("");
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  let id = query.get("id");
  useEffect(() => {
    axios.get(store.baseUrl + "comment?id=" + id).then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <>
      <NavBar />
      <h1 className="text-center">Edit Comment</h1>
      <div className="container">
        <form
          className="form-horizontal"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(store.baseUrl + "edit-comment?id=" + id, data)
              .then((res) => {
                setSuccess(res.data.message);
              })
              .catch((err) => {
                setSuccess("");
              });
          }}
        >
          <input type="hidden" name="comid" value="<?php echo $comid ?>" />
          {/* <!-- Start Comment Field --> */}
          <div className="form-group form-group-lg">
            <label className="col-sm-2 control-label">Comment</label>
            <div className="col-sm-10 col-md-6">
              <textarea
                className="form-control"
                name="comment"
                value={data.comment}
                onChange={(e) => {
                  setData({
                    ...data,
                    comment: e.target.value,
                  });
                }}
              >
                {/* <?php echo $row['comment'] ?> */}
                {/* {data.comment} */}
              </textarea>
            </div>
          </div>
          {/* <!-- End Comment Field -->
						<!-- Start Submit Field --> */}
          <div className="form-group form-group-lg">
            <div className="col-sm-offset-2 col-sm-10">
              <input
                type="submit"
                value="Save"
                className="btn btn-primary btn-sm"
              />
            </div>
          </div>
          {success && (
            <div className="alert alert-success text-center mt-3">
              {success}
            </div>
          )}
          {/* <!-- End Submit Field --> */}
        </form>
      </div>
    </>
  );
};

export default EditComment;

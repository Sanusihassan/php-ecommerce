import CommentsTable from "../components/CommentsTable";
import NavBar from "../components/NavBar";
import NoItemMsg from "../components/NoItemMsg";
import { store } from "../store";

const Comments = () => {
  console.log(store.weGotComments);
  return (
    <>
      <NavBar />
      <section className="container">
        {store.weGotComments ? (
          <h1 className="text-center">Manage Comments</h1>
        ) : (
          <NoItemMsg name="comments" />
        )}
        <CommentsTable />
      </section>
    </>
  );
};

export default Comments;

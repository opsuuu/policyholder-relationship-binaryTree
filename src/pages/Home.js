import { FaUsers } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import BinaryTree from "../components/BinaryTree";


const Home = () => {
  return (
    <>
      <div className="container">
        <header>
          <FaUsers /> 保戶關係查詢
        </header>
        <SearchBar />
        <BinaryTree />
      </div>
    </>
  );
};

export default Home;

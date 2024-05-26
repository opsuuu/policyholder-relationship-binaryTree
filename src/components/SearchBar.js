import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePolicyholder } from "../context/PolicyholderContext";

const SearchBar = () => {
  const [searchCode, setSearchCode] = useState("");
  const { fetchPolicyholders, defaultRootCode } = usePolicyholder();

  const handleSearch = () => {
    const regex = /^[0-9]{10}$/;
    if (!searchCode.match(regex)) {
      alert("請輸入10位數的保戶編號！");
      return;
    }
    if (!searchCode) {
      alert("請輸入保戶編號！");
      return;
    }
    fetchPolicyholders(searchCode);
  };

  const handleClear = () => {
    if (!searchCode) return;
    setSearchCode("");
    fetchPolicyholders(defaultRootCode);
  };

  return (
    <div className="searchContainer">
      <div style={{ position: "relative" }}>
        <label htmlFor="search" className="form-label">
          保護編號
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="請輸入保護編號"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <IoClose className="close-btn" onClick={handleClear} />
      </div>
      <div className="submitBtn" onClick={handleSearch}>
        查詢
      </div>
    </div>
  );
};

export default SearchBar;

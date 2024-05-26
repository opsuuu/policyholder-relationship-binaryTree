import { RiFlowChart } from "react-icons/ri";
import TreeNode from "./TreeNode";
import { usePolicyholder } from "../context/PolicyholderContext";

const BinaryTree = () => {
  const { policyholder, setPolicyholder } = usePolicyholder();

  const handleParentAsRoot = () => {
    if (policyholder && policyholder.parent) {
      setPolicyholder(policyholder.parent);
    }
  };

  return (
    <main>
      <div className="title">
        <RiFlowChart /> 關係圖
      </div>

      <div className="tree-container">
        <div className="tree-wrapper">
          {policyholder ? (
            <TreeNode
              node={policyholder}
              rootCode={policyholder.code}
              level={1}
              hasParent={false}
              parentHasRight={false}
            />
          ) : (
            <div className="no-data-text">未選擇要查閱的投保人。</div>
          )}
        </div>
        {policyholder && policyholder.parent && (
          <button className="previous-level-btn" onClick={handleParentAsRoot}>
            <span>上一層</span>
          </button>
        )}
      </div>
    </main>
  );
};

export default BinaryTree;

import { usePolicyholder } from "../context/PolicyholderContext";

const TreeNode = ({
  node,
  rootCode,
  level,
  className,
  hasParent,
  parentHasRight,
}) => {
  const { setPolicyholder, getNodeBackgroundColor } = usePolicyholder();

  if (!node || level > 4) {
    return null;
  }

  const handleClick = () => {
    setPolicyholder(node);
  };

  const hasLeftChildren = node.left && node.left.length > 0;
  const hasRightChildren = node.right && node.right.length > 0;
  const hasChildren = hasLeftChildren || hasRightChildren;

  return (
    <div
      className={`tree-node ${className} level-${level} ${
        parentHasRight ? "parent-has-right" : ""
      }`}
    >
      <div
        className={`node-content ${hasParent ? "has-parent" : ""}`}
        style={{ backgroundColor: getNodeBackgroundColor(node, rootCode) }}
      >
        <p className="link" onClick={handleClick}>
          {node.code}
        </p>
        <p>{node.name}</p>
        <p>{node.registration_date}</p>
      </div>
      <div className={`node-children ${hasChildren ? "has-children" : ""}`}>
        {hasLeftChildren &&
          node.left.map((leftNode) => (
            <TreeNode
              key={leftNode.code}
              node={leftNode}
              rootCode={rootCode}
              level={level + 1}
              className="left-node"
              hasParent={true}
              parentHasRight={hasRightChildren}
            />
          ))}
        {hasRightChildren &&
          node.right.map((rightNode) => (
            <TreeNode
              key={rightNode.code}
              node={rightNode}
              rootCode={rootCode}
              level={level + 1}
              className="right-node"
              hasParent={true}
              parentHasRight={false}
            />
          ))}
      </div>
      {hasLeftChildren && <div className="node-children::after"></div>}
      {hasRightChildren && <div className="node-children::after"></div>}
    </div>
  );
};

export default TreeNode;

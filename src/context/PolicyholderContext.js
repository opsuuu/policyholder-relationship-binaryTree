import { useContext, createContext, useState, useEffect } from "react";

const PolicyholderContext = createContext();

export const usePolicyholder = () => useContext(PolicyholderContext);

export const PolicyholderProvider = ({ children }) => {
  const [policyholder, setPolicyholder] = useState(null);
  const defaultRootCode = "0000000001";

  const fetchPolicyholders = async (code) => {
    try {
      // 獲取整個樹結構
      const rootNode = await getFullTree(defaultRootCode);
      // 根據指定的保護編號查找當前節點
      const currentNode = findNode(rootNode, code);

      if (!currentNode) {
        alert("無效的保戶號碼！");
        setPolicyholder(null);
        return;
      }

      // 設置當前的保戶及其上層節點為查找到的節點
      setPolicyholder({ ...currentNode, parent: currentNode.parent || null });
    } catch (error) {
      console.error("資料數據獲取失敗", error);
    }
  };

  const getFullTree = async (rootCode) => {
    const url = `http://localhost:3005/api/policyholders?code=${rootCode}`;
    const response = await fetch(url);
    const data = await response.json();
    // 返回增加 parent屬性的完整樹結構
    return addParentAttributes(data.policyholder);
  };

  // 遍歷所以樹結構，並在有上階層的節點增加其上階層節點的物件
  const addParentAttributes = (node, parent = null) => {
    if (!node) return null;
    node.parent = parent;

    if (node.left) {
      node.left = node.left.map((child) => addParentAttributes(child, node));
    }
    if (node.right) {
      node.right = node.right.map((child) => addParentAttributes(child, node));
    }
    return node;
  };

  // 根據特定code找節點 => 確保能夠在獲取整個樹結構後，快速找到所需的節點並設置為主節點
  const findNode = (node, code) => {
    if (!node) return null;
    if (node.code === code) return node;

    if (node.left) {
      for (let child of node.left) {
        const foundNode = findNode(child, code);
        if (foundNode) return foundNode;
      }
    }
    if (node.right) {
      for (let child of node.right) {
        const foundNode = findNode(child, code);
        if (foundNode) return foundNode;
      }
    }
    return null;
  };

  useEffect(() => {
    fetchPolicyholders(defaultRootCode);
  }, []);

  const getNodeBackgroundColor = (node, rootCode) => {
    if (node.code === rootCode) return "#ffdf5d"; //主節點
    if (node.introducer_code === rootCode) return "#8FD04E"; // 直接介紹節點
    return "#E6E6E6"; // 間接介紹節點
  };

  return (
    <PolicyholderContext.Provider
      value={{
        policyholder,
        defaultRootCode,
        setPolicyholder,
        fetchPolicyholders,
        getNodeBackgroundColor,
      }}
    >
      {children}
    </PolicyholderContext.Provider>
  );
};

const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }
  function deleteNode(tree, nodeId) {
    if (!tree.items) return tree;

    const filteredItems = tree.items.filter((item) => item.id !== nodeId);

    const updatedItems = filteredItems.map((item) => deleteNode(item, nodeId));

    return { ...tree, items: updatedItems };
  }
  function renameNode(tree, nodeId, newName) {
    if (tree.id === nodeId) {
      return { ...tree, name: newName };
    }

    const updatedItems = tree.items.map((item) =>
      renameNode(item, nodeId, newName)
    );

    return { ...tree, items: updatedItems };
  }

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;

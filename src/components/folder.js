import { useState } from "react";

function Folder({
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
  explorer,
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const [renameMode, setRenameMode] = useState(false);
  const [newName, setNewName] = useState(explorer.name);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onRenameNode = (e) => {
    if (e.keyCode === 13 && newName.trim()) {
      handleRenameNode(explorer.id, newName);
      setRenameMode(false);
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          {renameMode ? (
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={onRenameNode}
              onBlur={() => setRenameMode(false)}
              autoFocus
            />
          ) : (
            <span>📁{explorer.name}</span>
          )}
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>+Folder</button>
            <button onClick={(e) => handleNewFolder(e, false)}>+File</button>
            <button onClick={() => handleDeleteNode(explorer.id)}>
              Delete
            </button>
            <button onClick={() => setRenameMode(true)}>Rename</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                className="inputContainer_input"
                onKeyDown={onAddFolder}
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
              ></input>
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {renameMode ? (
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={onRenameNode}
            onBlur={() => setRenameMode(false)}
            autoFocus
          />
        ) : (
          <span className="file">📄{explorer.name}</span>
        )}
        <button onClick={() => handleDeleteNode(explorer.id)}>Delete</button>
        <button onClick={() => setRenameMode(true)}>Rename</button>
      </div>
    );
  }
}

export default Folder;

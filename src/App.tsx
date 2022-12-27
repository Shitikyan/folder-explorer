import { useEffect, useRef, useState, KeyboardEvent, useCallback } from "react";
import uuid from "react-uuid";
import Button from "components/button/button";
import FolderExplorer from "components/folder-explorer/folder-explorer";
import { ElementType } from "types/enums";
import { FolderExplorerItem } from "types/interfaces";

import "./App.scss";

function App() {
  const [folders, setFolders] = useState<FolderExplorerItem[]>([]);
  const [itemName, setItemName] = useState("");
  const [selectedElementId, setSelectedElementId] = useState("");
  const [addingElementType, setAddingElementType] = useState(ElementType.NONE);
  const appRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (appRef.current && !appRef.current.contains(event.target)) {
        setSelectedElementId("");
        setItemName("");
        setAddingElementType(ElementType.NONE);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (addingElementType !== ElementType.NONE && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [addingElementType]);

  const findPath = useCallback(
    (
      data: FolderExplorerItem[],
      id: string,
      fileType?: ElementType,
      filePath?: string
    ) => {
      let type: ElementType | undefined, path: string | undefined;
      data.forEach((elem) => {
        if (elem.id === id) {
          type = elem.type;
          path = `/${elem.name}`;
          return;
        }
        if (elem.children) {
          const newPath = findPath(elem.children, id, fileType, filePath);
          if (newPath.path !== filePath) {
            path = `/${elem.name}${newPath.path}`;
            type = newPath.type;
          }
        }
      });
      return { path, type };
    },
    []
  );

  const findItemByPath = useCallback(
    (
      pathArray: string[],
      data?: FolderExplorerItem[]
    ): FolderExplorerItem | undefined => {
      const midNode = data?.find((item) => item.name === pathArray[0]);
      if (pathArray.length === 1) {
        return midNode;
      }
      return findItemByPath(pathArray.slice(1), midNode?.children);
    },
    []
  );

  const handleAddItem = useCallback(
    (name: string, itemType: ElementType) => {
      const oldElements = [...folders];
      if (!selectedElementId) {
        if (itemType === ElementType.FILE) {
          oldElements.push({ type: ElementType.FILE, id: uuid(), name });
        } else if (itemType === ElementType.FOLDER) {
          oldElements.push({
            type: ElementType.FOLDER,
            id: uuid(),
            name,
            children: [],
          });
        }
        setFolders(oldElements);
        return;
      }

      let { path, type } = findPath(oldElements, selectedElementId);
      path = path?.replace("/", "");
      if (type === ElementType.FILE) {
        path = path?.split("/").slice(0, -1).join("/");
      }
      const pathArray = path?.split("/");
      if (pathArray) {
        const item = findItemByPath(pathArray, oldElements);
        if (item) {
          if (itemType === ElementType.FILE) {
            item.children?.push({ type: itemType, id: uuid(), name });
          } else if (itemType === ElementType.FOLDER) {
            item.children?.push({
              type: itemType,
              id: uuid(),
              name,
              children: [],
            });
          }
        }
      }
      setFolders(oldElements);
      setAddingElementType(ElementType.NONE);
    },
    [findItemByPath, findPath, folders, selectedElementId]
  );

  const handleElementSelect = useCallback((elementId: string) => {
    setItemName("");
    setAddingElementType(ElementType.NONE);
    setSelectedElementId(elementId);
  }, []);

  const handleAddFolderOrFile = (e: KeyboardEvent) => {
    if (e.key === "Enter" && itemName && !selectedElementId) {
      handleAddItem(itemName, addingElementType);
      setItemName("");
      setAddingElementType(ElementType.NONE);
    }
  };

  return (
    <div className="app" ref={appRef} onKeyDown={handleAddFolderOrFile}>
      <div className="button-container">
        <Button onClick={() => setAddingElementType(ElementType.FILE)}>
          Add file
        </Button>
        <Button onClick={() => setAddingElementType(ElementType.FOLDER)}>
          Add folder
        </Button>
      </div>
      {addingElementType !== ElementType.NONE && !selectedElementId && (
        <input
          ref={inputRef}
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      )}
      <FolderExplorer
        folders={folders}
        selectedElementId={selectedElementId}
        elementToAdd={addingElementType}
        handleAddItem={handleAddItem}
        onElementSelect={handleElementSelect}
      />
    </div>
  );
}

export default App;

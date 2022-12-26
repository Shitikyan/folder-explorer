import { useEffect, useRef, useState, KeyboardEvent } from "react";
import FolderExplorer, {
    FolderExplorerItem,
    folderType,
} from "./components/folder-explorer/folder-explorer";
import uuid from "react-uuid";

import "./App.scss";

export interface IAddType {
    file: boolean;
    folder: boolean;
}

function App() {
    const [folders, setFolders] = useState<FolderExplorerItem[]>([]);
    const [selected, setSelected] = useState("");
    const [itemName, setItemName] = useState("");
    const [isAdding, setIsAdding] = useState({
        file: false,
        folder: false,
    });
    const appRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (appRef.current && !appRef.current.contains(event.target)) {
                setSelected("");
                handleAdd("none");
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    const handleAdd = (type: string) => {
        if (type === "file") {
            setIsAdding({
                file: true,
                folder: false,
            });
        } else if (type === "folder") {
            setIsAdding({
                file: false,
                folder: true,
            });
        } else {
            setIsAdding({
                file: false,
                folder: false,
            });
        }
    };

    const findPath = (
        data: FolderExplorerItem[],
        id: string,
        type?: string,
        path?: string
    ) => {
        data.forEach((elem) => {
            if (elem.id === id) {
                type = elem.type;
                path = `/${elem.name}`;
                return;
            }
            if (elem.children) {
                const newPath = findPath(elem.children, id, type, path);
                if (newPath.path !== path) {
                    path = `/${elem.name}${newPath.path}`;
                    type = newPath.type;
                }
            }
        });
        return { path, type };
    };

    const findItemByPath: any = (
        pathArray: string[],
        data?: FolderExplorerItem[]
    ) => {
        const midNode = data?.find((e) => e.name === pathArray[0]);
        if (pathArray.length === 1) {
            return midNode;
        }
        return findItemByPath(pathArray.slice(1), midNode?.children);
    };

    const handleAddItem = (name: string, itemType: string) => {
        if (!selected) {
            if (itemType === "file") {
                folders.push({ type: folderType.FILE, id: uuid(), name });
            } else if (itemType === "folder") {
                folders.push({
                    type: folderType.FOLDER,
                    id: uuid(),
                    name,
                    children: [],
                });
            }
            setFolders(folders);
            return;
        }
        let { path, type } = findPath(folders, selected);
        path = path?.replace("/", "");
        if (type === "file") {
            path = path?.split("/").slice(0, -1).join("/");
        }
        const pathArray = path?.split("/");
        const item = findItemByPath(pathArray as string[], folders);
        if (itemType === "file") {
            item.children.push({ type: itemType, id: uuid(), name });
        } else if (itemType === "folder") {
            item.children.push({
                type: itemType,
                id: uuid(),
                name,
                children: [],
            });
        }
        setFolders([...folders]);
    };

    const handleAddFolderOrFile = (e: KeyboardEvent) => {
        if (e.key === "Enter" && itemName && !selected) {
            handleAddItem(itemName, isAdding.file ? "file" : "folder");
            setItemName("");
            handleAdd("none");
        }
    };

    return (
        <div className="app" ref={appRef} onKeyDown={handleAddFolderOrFile}>
            <div className="navbar">
                <button onClick={() => handleAdd("file")}>add file</button>
                <button onClick={() => handleAdd("folder")}>add folder</button>
            </div>
            {(isAdding.file || isAdding.folder) && !selected && (
                <input
                    type="text"
                    value={itemName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setItemName(e.target.value)
                    }
                />
            )}
            <FolderExplorer
                folders={folders}
                selected={selected}
                isAdding={isAdding}
                handleAdd={handleAdd}
                handleAddItem={handleAddItem}
                setSelected={setSelected}
            />
        </div>
    );
}

export default App;

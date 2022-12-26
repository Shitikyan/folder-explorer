import { FC } from "react";
import { IAddType } from "../../App";
import File from "../file/file";
import Folder from "../folder/folder";

import "./folder-explorer.scss";

export interface FolderExplorerItem {
    id: string;
    name: string;
    type: folderType;
    children?: FolderExplorerItem[];
}

interface IFolderExplorerProps {
    isAdding: IAddType;
    handleAdd: (type: string) => void;
    selected: string;
    setSelected: (id: string) => void;
    folders: FolderExplorerItem[];
    handleAddItem: (name: string, itemType: string) => void;
}

export enum folderType {
    FOLDER = "folder",
    FILE = "file",
}

const FolderExplorer: FC<IFolderExplorerProps> = ({
    folders,
    selected,
    setSelected,
    isAdding,
    handleAdd,
    handleAddItem,
}) => {
    return (
        <div className="folder-explorer">
            {folders.map((folder, index) =>
                folder.type === "folder" ? (
                    <Folder
                        handleAdd={handleAdd}
                        handleAddItem={handleAddItem}
                        isAdding={isAdding}
                        name={folder.name}
                        key={folder.id}
                        id={folder.id}
                        selected={selected}
                        setSelected={setSelected}
                    >
                        {folder.children?.map((item) =>
                            item.type === "folder" ? (
                                <FolderExplorer
                                    handleAddItem={handleAddItem}
                                    handleAdd={handleAdd}
                                    isAdding={isAdding}
                                    key={item.id}
                                    folders={[item]}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            ) : (
                                <File
                                    name={item.name}
                                    id={item.id}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            )
                        )}
                    </Folder>
                ) : (
                    <File
                        name={folder.name}
                        key={folder.id}
                        id={folder.id}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )
            )}
        </div>
    );
};

export default FolderExplorer;

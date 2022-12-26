import React, { KeyboardEvent, FC, useState } from "react";
import { IAddType } from "../../App";
import { icons } from "../../config/icons";

import "./folder.scss";

interface IFolderProps {
    name: string;
    selected: string;
    setSelected: (id: string) => void;
    id: string;
    children?: any;
    isAdding: IAddType;
    handleAdd: (type: string) => void;
    handleAddItem: (name: string, itemType: string) => void;
}

const Folder: FC<IFolderProps> = ({
    name,
    id,
    selected,
    setSelected,
    children,
    isAdding,
    handleAdd,
    handleAddItem,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const toggle = () => setIsOpen(!isOpen);

    const handleAddFolderOrFile = (e: KeyboardEvent) => {
        if (e.key === "Enter" && itemName) {
            handleAddItem(itemName, isAdding.file ? "file" : "folder");
            setItemName("");
        }
    };

    return (
        <div className="folder" onKeyDown={handleAddFolderOrFile}>
            <div
                className="folder-content"
                style={{
                    background: selected === id ? "#99bbf2" : "transparent",
                }}
                onClick={() => {
                    setSelected(id);
                    handleAdd("none");
                }}
            >
                <img
                    src={isOpen ? icons.arrowDown : icons.arrowRight}
                    alt="arrow"
                    onClick={toggle}
                />
                <img src={icons.folder} alt="folder" />
                <span>{name}</span>
            </div>
            {isOpen && (
                <div className="folder-items-container">
                    {(isAdding.file || isAdding.folder) &&
                        (id === selected ||
                            children?.find(
                                (elem: any) => elem.props.id === id
                            )) && (
                            <input
                                type="text"
                                value={itemName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setItemName(e.target.value)}
                            />
                        )}
                    {children}
                </div>
            )}
        </div>
    );
};

export default Folder;

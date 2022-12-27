import {
  KeyboardEvent,
  FC,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { icons } from "config/icons";
import { ElementType } from "types/enums";
import { IFolderProps } from "./types";

import "./folder.scss";

const Folder: FC<IFolderProps> = ({
  folder,
  selectedElementId,
  onElementSelect,
  children,
  elementToAdd,
  handleAddItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => {
    if (elementToAdd !== ElementType.NONE && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    } else if (elementToAdd === ElementType.NONE) {
      setItemName("");
    }
  }, [elementToAdd]);

  const handleAddFolderOrFile = (e: KeyboardEvent) => {
    if (e.key === "Enter" && itemName) {
      handleAddItem(itemName, elementToAdd);
      setItemName("");
    }
  };

  return (
    <div className="folder" onKeyDown={handleAddFolderOrFile}>
      <div
        className="folder-content"
        style={{
          background:
            selectedElementId === folder.id ? "#99bbf2" : "transparent",
        }}
        onClick={() => {
          onElementSelect(folder.id);
        }}
      >
        <img
          src={isOpen ? icons.arrowDown : icons.arrowRight}
          alt="arrow"
          onClick={toggle}
        />
        <img src={icons.folder} alt="folder" />
        <span>{folder.name}</span>
      </div>
      {isOpen && (
        <div className="folder-items-container">
          {elementToAdd !== ElementType.NONE &&
            folder.id === selectedElementId && (
              <input
                ref={inputRef}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            )}
          {children}
        </div>
      )}
    </div>
  );
};

export default Folder;

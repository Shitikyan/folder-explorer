import { FC } from "react";
import File from "../file/file";
import Folder from "../folder/folder";
import { ElementType } from "types/enums";
import { IFolderExplorerProps } from "./types";

import "./folder-explorer.scss";

const FolderExplorer: FC<IFolderExplorerProps> = ({
  folders,
  selectedElementId,
  onElementSelect,
  elementToAdd,
  handleAddItem,
}) => {
  return (
    <div className="element-explorer">
      {folders.map((element) =>
        element.type === ElementType.FOLDER ? (
          <Folder
            key={element.id}
            handleAddItem={handleAddItem}
            elementToAdd={elementToAdd}
            folder={element}
            selectedElementId={selectedElementId}
            onElementSelect={onElementSelect}
          >
            {element.children?.map((item) =>
              item.type === ElementType.FOLDER ? (
                <FolderExplorer
                  key={item.id}
                  handleAddItem={handleAddItem}
                  elementToAdd={elementToAdd}
                  folders={[item]}
                  selectedElementId={selectedElementId}
                  onElementSelect={onElementSelect}
                />
              ) : (
                <File
                  key={item.id}
                  file={item}
                  selectedElementId={selectedElementId}
                  onElementSelect={onElementSelect}
                />
              )
            )}
          </Folder>
        ) : (
          <File
            key={element.id}
            file={element}
            selectedElementId={selectedElementId}
            onElementSelect={onElementSelect}
          />
        )
      )}
    </div>
  );
};

export default FolderExplorer;

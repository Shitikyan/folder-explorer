import { ElementType } from "types/enums";
import { FolderExplorerItem } from "types/interfaces";

export interface IFolderExplorerProps {
  elementToAdd: ElementType;
  selectedElementId: string;
  onElementSelect: (id: string) => void;
  folders: FolderExplorerItem[];
  handleAddItem: (name: string, itemType: ElementType) => void;
}

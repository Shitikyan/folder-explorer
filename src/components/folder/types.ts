import { ElementType } from "types/enums";
import { FolderExplorerItem } from "types/interfaces";

export interface IFolderProps {
  folder: FolderExplorerItem;
  selectedElementId: string;
  onElementSelect: (id: string) => void;
  children?: any;
  elementToAdd: ElementType;
  handleAddItem: (name: string, itemType: ElementType) => void;
}

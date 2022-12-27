import { FolderExplorerItem } from "types/interfaces";

export interface IFileProps {
  file: FolderExplorerItem;
  selectedElementId: string;
  onElementSelect: (id: string) => void;
}

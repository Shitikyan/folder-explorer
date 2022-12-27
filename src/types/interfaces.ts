import { ElementType } from "./enums";

export interface FolderExplorerItem {
  id: string;
  name: string;
  type: ElementType;
  children?: FolderExplorerItem[];
}

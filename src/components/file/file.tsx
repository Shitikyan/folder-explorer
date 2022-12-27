import { FC } from "react";
import { icons } from "config/icons";
import { IFileProps } from "./types";

import "./file.scss";

const File: FC<IFileProps> = ({ file, selectedElementId, onElementSelect }) => {
  return (
    <div
      className="file"
      onClick={() => onElementSelect(file.id)}
      style={{
        background: selectedElementId === file.id ? "#99bbf2" : "transparent",
      }}
    >
      <img src={icons.file} alt="file" />
      <span>{file.name}</span>
    </div>
  );
};

export default File;

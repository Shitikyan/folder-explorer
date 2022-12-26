import { FC } from "react";
import { icons } from "../../config/icons";

import "./file.scss";

interface IFileProps {
    name: string;
    id: string;
    selected: string;
    setSelected: (id: string) => void;
}

const File: FC<IFileProps> = ({ name, selected, setSelected, id }) => {
    return (
        <div
            className="file"
            onClick={() => setSelected(id)}
            style={{
                background: selected === id ? "#99bbf2" : "transparent",
            }}
        >
            <img src={icons.file} alt="file" />
            <span>{name}</span>
        </div>
    );
};

export default File;

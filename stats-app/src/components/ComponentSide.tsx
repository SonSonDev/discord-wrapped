import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface ILink {
  index: number
  name: string
  link: string
  active: boolean
}

interface IProp {
  links: ILink[]
}


const ComponentSide: React.FC<IProp> = (props: IProp): JSX.Element => {
  const [ isOpened, toggleSide ] = useState<boolean>(false);

  return (
    <div className={`side ${isOpened ? "opened" : ""}`}>
      <button className="side__opener"
              onClick={() => toggleSide(!isOpened)}>
        {!isOpened ? "<" : ">"}
      </button>
      <ul>
        {
          props?.links?.map(l => (
            <li key={l.name}>
              <Link to={l.link} className={l.active ? "active" : ""}>
                {l.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
export default ComponentSide;

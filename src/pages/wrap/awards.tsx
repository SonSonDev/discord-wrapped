import React from "react";
import { IAwards } from "../../utils/interfaces";

interface IProps {
  awards: IAwards;
}

const Awards: React.FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <div>
      {props ? "-" : "-"}
    </div>
  );
};

export default Awards;

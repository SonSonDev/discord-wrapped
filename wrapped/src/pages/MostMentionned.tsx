import React from "react";
import { IContent } from "../../../common/interfaces";

interface IProps {
  content: IContent;
}

const MostMentioned: React.FC<IProps> = (props: IProps): JSX.Element => {
  console.log(props);
  return <></>;
};

export default MostMentioned;

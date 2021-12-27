import React from "react";
import { IChannelWrapped } from "../../utils/interfaces";

interface IProps {
  channels: IChannelWrapped[];
}

const ChannelsWrapped: React.FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <div>
      {props ? "-" : "-"}
    </div>
  );
};

export default ChannelsWrapped;

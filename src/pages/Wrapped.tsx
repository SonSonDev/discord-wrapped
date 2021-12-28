import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getContent } from "../utils/axios";
import { IContent } from "../utils/interfaces";
import Awards from "./wrap/awards";
import ChannelsWrapped from "./wrap/channels";
import UsersWrapped from "./wrap/users";

const Wrapped: React.FC = (): JSX.Element => {
  const { id } = useParams() || "";

  const [ content, setContent ] = useState<IContent>({} as IContent);
  const [ loading, setLoading ] = useState(true);
  if (id) {
    useEffect(() => {
      (async function anyNameFunction () {
        setLoading(true);
        setContent(await getContent(id));
        setLoading(false);
      })();
    }, []);
  }

  if (loading) return <div />;

  if (!loading && !content.guild) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="guild">
      <header>
        <h1>
            Discord Wrapped of <span className="guild__name whitespace-nowrap">{content.guild.name}</span> 2021
        </h1>
      </header>

      <UsersWrapped users={content.users} />
      <ChannelsWrapped channels={content.channels} />
      <Awards awards={content.awards} />
    </div>
  );
};

export default Wrapped;

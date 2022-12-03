import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getContent } from "../utils/axios";
import { IContent } from "../../../common/interfaces";
import Rankings from "./wrap/rankings";
import ChannelsWrapped from "./wrap/channels";
import UsersWrapped from "./wrap/users";

enum Sections {
  users = "users",
  channels = "channels",
  rankings = "rankings",
}

const Wrapped: React.FC = (): JSX.Element => {
  const { id, section } = useParams() || {};

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

  let element: JSX.Element = <></>;
  if (!section || section === Sections.users) {
    element = <UsersWrapped users={content.users} />;
  } else if (section === Sections.channels) {
    element = <ChannelsWrapped channels={content.channels} />;
  } else if (section === Sections.rankings) {
    element = <Rankings rankings={content.rankings} />;
  } else if (section) {
    element = <Navigate replace to={`/${id}`} />;
  }

  return (
    <div className="guild">
      <header>
        <h1>
          Discord Wrapped of
          <span className="guild__name whitespace-nowrap mx-3">{content.guild.name}</span>
          2021
        </h1>
      </header>

      <nav className="mb-4">
        <Link to={`/${id}/${Sections.users}`}>Membres</Link>
        <span className="mx-2">/</span>
        <Link to={`/${id}/${Sections.channels}`}>Salons</Link>
        <span className="mx-2">/</span>
        <Link to={`/${id}/${Sections.rankings}`}>Classements</Link>
      </nav>

      { element }
    </div>
  );
};

export default Wrapped;

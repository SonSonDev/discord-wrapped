import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getContent } from "../utils/axios";
import { IContent } from "../../../common/interfaces";
import Rankings from "./wrap/rankings";
import ChannelsWrapped from "./wrap/channels";
import UsersWrapped from "./wrap/users";
import ComponentSide, { ILink } from "../components/ComponentSide";

enum Sections {
  rankings = "rankings",
  channels = "channels",
  users = "users",
}

const Wrapped: React.FC = (): JSX.Element => {
  const { id, section, index } = useParams() || {};

  const [ content, setContent ] = useState<IContent>({} as IContent);
  const [ loading, setLoading ] = useState(true);
  let links: ILink[] = [] as ILink[];

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
  if (section === Sections.users) {
    element = <UsersWrapped users={content.users} />;
    links = content.users.map((u, i) => {
      return {
        index: i,
        name: u.username,
        link: `/${id}/${section}/${i}`,
        active: parseInt(index || "0") === i,
      };
    });
  } else if (section === Sections.channels) {
    element = <ChannelsWrapped channels={content.channels} />;
    links = content.channels.map((c, i) => {
      return {
        index: i,
        name: c.name,
        link: `/${id}/${section}/${i}`,
        active: parseInt(index || "0") === i,
      };
    });
  } else if (section === Sections.rankings) {
    element = <Rankings rankings={content.rankings} />;
    links = content.rankings.map((r, i) => {
      return {
        index: i,
        name: r.name,
        link: `/${id}/${section}/${i}`,
        active: parseInt(index || "0") === i,
      };
    });

  } else if (!section || !(Object.values(Sections) as string[]).includes(section)) {
    element = <Navigate replace to={`/${id}/${Sections.rankings}`} />;
  }

  return (
    <div className="content">
      <div className="page">
        <header>
          <h1>
            Discord Wrapped <span className="year">{content.year}</span> of
            <span className="guild__name">{content.guild.name}</span>
          </h1>
        </header>

        <nav className="nav">
          <Link className={section === Sections.rankings ? "active" : ""}
                to={`/${id}/${Sections.rankings}`}>Classements
          </Link>
          <span className="mx-2">/</span>

          <Link className={section === Sections.channels ? "active" : ""}
                to={`/${id}/${Sections.channels}`}>Salons
          </Link>
          <span className="mx-2">/</span>
          <Link className={section === Sections.users ? "active" : ""}
                to={`/${id}/${Sections.users}`}>Membres
          </Link>
        </nav>

        {element}
      </div>

      <ComponentSide links={links} />
    </div>
  );
};

export default Wrapped;

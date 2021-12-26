import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getContent } from "../utils/axios";


interface IUser {
  name: string;
  avatar: string;
  words: [
    {
      text: string;
      count: number;
    }
  ]
  channels: [
    {
      name: string;
      count: number;
    }
  ]
  emojis: [
    {
      url: string;
      text: string;
      count: number;
    }
  ]
  mentions: [
    {
      username: string;
      avatar: string;
      count: 0;
    }
  ]
}

export interface IContent {
  guild: {
    name: string;
  }
  users: IUser[]
}

const Wrapped: React.FC = (): JSX.Element => {
  const { id } = useParams() || "";

  const [ content, setContent ] = useState<IContent>({} as IContent);
  const [ loading, setLoading ] = useState(true);
  if (id) {
    useEffect(() => {
      // Using an IIFE
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
          Discord Wrapped of <span className="guild__name">{content.guild.name}</span> 2021
        </h1>
      </header>
      <section>
        <h2>☆ Members ☆</h2>
        {
          content.users.map(u => (
            <div key={u.name}
                 className="user" >
              <div className="user__name">
                <img src={u.avatar} alt={`avatar de ${u.name}`} />
                <h3>--- {u.name} ---</h3>
              </div>
              <div className="categories">
                <div className="categories__item">
                  <h4>Mots les plus utilisés:</h4>
                  <ul>
                    {
                      u.words.length ? u.words.map(w => (
                        <li key={u.name + w.text}>♦ {w.text} <span className="count">{w.count}</span></li>
                      )) : "-"
                    }
                  </ul>
                </div>

                <div className="categories__item">
                  <h4>Salons préférés:</h4>
                  <ul>
                    {
                      u.channels.map(c => (
                        <li key={u.name + c.name}>♦ {c.name} <span className="count">{c.count}</span></li>
                      ))
                    }
                  </ul>
                </div>

                <div className="categories__item">
                  <h4>Emojis préférés:</h4>
                  <ul className="emoji-list">
                    {
                      u.emojis.length ? u.emojis.map(e => (
                        <li key={u.name + e.text}
                            className="emoji-list__item">
                              ♦ <div className="wrapper"><img src={e.url} alt={e.text} /></div> <span className="count">{e.count}</span>
                        </li>
                      )) : "-"
                    }
                  </ul>
                </div>

                <div className="categories__item">
                  <h4>Mentions:</h4>
                  <ul className="emoji-list">
                    {
                      u.mentions.length ? u.mentions.map(m => (
                        <li key={m.username}
                            className="emoji-list__item">
                              ♦ <div className="wrapper"><img src={m.avatar} alt={m.username} /></div> <span className="name">@{m.username}</span> <span className="count">{m.count}</span>
                        </li>
                      )) : "-"
                    }
                  </ul>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  );
};

export default Wrapped;

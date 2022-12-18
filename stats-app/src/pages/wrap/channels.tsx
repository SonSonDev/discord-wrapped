import React from "react";
import { useParams } from "react-router-dom";
import { IChannelWrapped } from "../../../../common/interfaces";

interface IProps {
  channels: IChannelWrapped[];
}

const ChannelsWrapped: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { index } = useParams() || { index: 0 };
  const c: IChannelWrapped|null = props.channels[parseInt(index || "0")];

  return (
    <section>
      {
        <div key={c.name}
             className="user" >
          <div className="user__name mb-4">
            <h3>{c.name}</h3><span className="count ml-2">{c.count}</span>
          </div>
          <div className="categories">

            <div className="categories__item">
              <h4>Membres:</h4>
              <ul className="user-list">
                {
                  c.users.length ? c.users.map(u => (
                    <li key={u.username}
                        className="user-list__item">♦
                      <div className="wrapper">
                        <img src={u.avatar} alt={u.username} />
                      </div>
                      <span className="name">@{u.username}</span>
                      <span className="count">{u.count}</span>
                    </li>
                  )) : "-"
                }
              </ul>
            </div>

            <div className="categories__item">
              <h4>Emojis préférés:</h4>
              <ul className="emoji-list">
                {
                  c.emojis.length ? c.emojis.map(e => (
                    <li key={c.name + e.text}
                        className="emoji-list__item">♦
                      <div className="wrapper">
                        <img src={e.url} alt={e.text} />
                      </div>
                      <span className="count">{e.count}</span>
                    </li>
                  )) : "-"
                }
              </ul>
            </div>

          </div>
        </div>
      }
    </section>
  );
};

export default ChannelsWrapped;

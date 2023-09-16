import React, { EventHandler, ReactEventHandler } from "react";
import { useParams } from "react-router-dom";
import { IUserWrapped } from "../../../../common/interfaces";
import BarChart from "../../components/BarChart";
import onAvatarError from "../../utils/utils";

interface IProp {
  users: IUserWrapped[]
}

const UsersWrapped: React.FC<IProp> = (props: IProp): JSX.Element => {
  const { index } = useParams() || { index: 0 };
  const u: IUserWrapped|null = props.users[parseInt(index || "0")];

  return (
    <section>
      { u ? (
        <div className="user">
          <div className="user__name">
            <img src={u.avatar}
                 onError={onAvatarError}
                 alt={`avatar de ${u.username}`} />
            <h3>{u.username}</h3><span className="count ml-2">{u.count}</span>
          </div>
          <div className="categories">
            <div className="categories__item">
              <h4>Mots les plus utilisés:</h4>
              <ul>
                {
                  u.words.length ? u.words.map(w => (
                    <li key={u.username + w.text}>{w.text} <span className="count">{w.count}</span></li>
                  )) : "-"
                }
              </ul>
            </div>

            <div className="categories__item">
              <h4>Salons préférés:</h4>
              <ul>
                {
                  u.channels.map(c => (
                    <li key={u.username + c.name}>{c.name} <span className="count">{c.count}</span></li>
                  ))
                }
              </ul>
            </div>

            <div className="categories__item">
              <h4>Emojis préférés:</h4>
              <ul className="emoji-list">
                {
                  u.emojis.length ? u.emojis.map(e => (
                    <li key={u.username + e.text}
                        className="emoji-list__item">
                      <div className="wrapper">
                        <img src={e.url}
                             onError={onAvatarError}
                             alt={e.text} />
                      </div>
                      <span className="count">{e.count}</span>
                    </li>
                  )) : "-"
                }
              </ul>
            </div>

            <div className="categories__item">
              <h4>Mentions:</h4>
              <ul className="user-list">
                {
                  u.mentions.length ? u.mentions.map(m => (
                    <li key={m.username}
                        className="user-list__item">
                      <div className="wrapper">
                        <img src={m.avatar}
                             onError={onAvatarError}
                             alt={m.username} />
                      </div>
                      <span className="name">@{m.username}</span>
                      <span className="count">{m.count}</span>
                    </li>
                  )) : "-"
                }
              </ul>
            </div>

            <div className="categories__item">
              <h4>Activité moyenne par heure:</h4>
              <BarChart style={{ width: "100%" }}
                        key={"days-chart" + u.username} data={u.hours.map(h => ({ name: h.hour.toString(), count:h.count }))} xGap={-1}/>
            </div>

            <div className="categories__item">
              <h4>Activité moyenne par jour:</h4>
              <BarChart style={{ width: "100%" }}
                        key={"days-chart" + u.username} data={u.days}/>
            </div>

            <div className="categories__item">
              <h4>Activité par mois:</h4>
              <BarChart style={{ width: "100%" }}
                        key={"month-chart" + u.username} data={u.months}/>
            </div>
          </div>
        </div>
      ) : <></>
      }
    </section>
  );
};

export default UsersWrapped;

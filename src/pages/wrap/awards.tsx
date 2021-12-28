import React from "react";
import { IAward, IUser } from "../../utils/interfaces";

interface IProps {
  awards: IAward[];
}

const titles = {
  "messagesNumber": "Nombres de messages",
  "emojisNumber": "Nombre d'emojis",
  "linksNumber": "Nombre de liens",
  "picturesNumber": "Nombre d'images",
  "editsNumber": "Nombre d'éditions",
  "mentionsNumber": "Nombre de mentions",
  "spoilsNumber": "Nombre de spoils",
};

const Awards: React.FC<IProps> = (props: IProps): JSX.Element => {
  titles["messagesNumber"];
  return (
    <section>
      <h2>☆ Classements ☆</h2>
      <div className="categories">
        {
          props.awards.map((a: IAward) => (
            <div key={a.key}>
              <div className="categories__item">
                <h4>--- <span>{ a.name }</span> ---</h4>

                <ul className="user-list">
                  {
                    a.users.length ? a.users.map((u: IUser) => (
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
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default Awards;

import React from "react";
import { useParams } from "react-router-dom";
import { IRanking, IUser } from "../../../../common/interfaces";

interface IProps {
  rankings: IRanking[];
}

const Rankings: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { index } = useParams() || { index: 0 };
  const a: IRanking|null = props.rankings[parseInt(index || "0")];


  return (
    <section>
      <div className="categories">
        {
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
        }
      </div>
    </section>
  );
};

export default Rankings;

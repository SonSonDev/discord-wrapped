import React, { useState } from "react";
import "./assets/style/index.scss";
import content from "../../common/content.json";
import FavouriteChannel from "./pages/FavouriteChannels";
import FavouriteEmoji from "./pages/FavouriteEmojis";
import MessageStats from "./pages/MessageStats";
import MostMentioned from "./pages/MostMentionned";
import Rankings from "./pages/Rankings";
import Welcome from "./pages/Welcome";

const Components = [
  Welcome,
  FavouriteChannel,
  FavouriteEmoji,
  MostMentioned,
  MessageStats,
  Rankings,
];

const App: React.FC = (): JSX.Element => {
  const [ step, setStep ] = useState(0);
  const Component = Components[step];

  return (
    <div className="text-center">
      <Component content={content} />
      <button onClick={() => setStep(step + 1)}>test</button>
    </div>
  );
};

export default App;

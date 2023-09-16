const onAvatarError = (
  { currentTarget }: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
  currentTarget.onerror = null;
  currentTarget.src = "https://cdn.discordapp.com/embed/avatars/1.png";
};

export default onAvatarError;

export interface IUser {
  username: string;
  avatar: string;
  count: number;
}

export interface IChannel {
  name: string;
  count: number;
}

export interface IWord {
  text: string;
  count: number;
}

export interface IEmoji extends IWord {
  url: string;
  name: string;
}

export interface IUserWrapped extends IUser {
  words: IWord[]
  channels: IChannel[]
  emojis: IEmoji[]
  mentions: IUser[]
}

export interface IChannelWrapped extends IChannel {
  users: IUser[]
  emojis: IEmoji[]
}

export interface IAwards {
  messagesNumber: IUser[]
  wordsNumber: IUser[]
  emojisNumber: IUser[]
  reactionsNumber: IUser[]
  linksNumber: IUser[]
  picturesNumber: IUser[]
  editsNumber: IUser[]
  mentionsNumber: IUser[]
  spoilsNumber: IUser[]
}

export interface IContent {
  guild: {
    name: string;
  }
  users: IUserWrapped[];
  channels: IChannelWrapped[];
  awards: IAwards;
}
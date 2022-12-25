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

export interface IHour {
  hour: number;
  count: number;
}

export interface IDay {
  day: number;
  name: string;
  count: number;
}

export interface IMonth {
  month: number;
  name: string;
  count: number;
}

export interface IDate {
  date: number;
  formatted: string;
  count: number;
}

export interface IUserWrapped extends IUser {
  words: IWord[]
  channels: IChannel[]
  emojis: IEmoji[]
  mentions: IUser[]
  hours: IHour[];
  days: IDay[];
  months: IMonth[];
  dates: IDate[];
}

export interface IChannelWrapped extends IChannel {
  users: IUser[]
  emojis: IEmoji[]
  months: IMonth[]
}

export interface IRanking {
  key: string;
  name: string;
  users: IUser[];
}


export interface IMonthWrapped extends IMonth {
  users: IUser[];
  channels: IChannel[];
}

export interface IContent {
  guild: {
    name: string;
  }
  year: number;
  users: IUserWrapped[];
  channels: IChannelWrapped[];
  rankings: IRanking[];
  months: IMonthWrapped[];
}

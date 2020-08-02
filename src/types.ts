export interface JogItem {
  distance: number;
  time: number;
  date: Date;
}

export interface JogItemFromAPI {
  date: number;
  distance: number;
  id: number;
  time: number;
  user_id: number;
}

export interface FormattedJogItem extends JogItem {
  speed: number;
  id: number;
  user_id: number;
}

export interface IContext {
  token: string | null;
  setToken: (token: string) => void;
}

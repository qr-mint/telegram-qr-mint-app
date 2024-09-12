import { TonConnectUI } from '@tonconnect/ui-react';

type AuthState = {
  access_token: string | null;
  user: any | null;
  connector?: TonConnectUI | null;
};

type AuthActions = {
  connect: (body: any) => Promise<void>;
  refreshToken: () => Promise<void>;
  disconnect: () => Promise<void>;
  getMe: () => Promise<void>;
  setTonConnector: (connector: TonConnectUI) => void;
}

export type AuthStore = AuthState & AuthActions;

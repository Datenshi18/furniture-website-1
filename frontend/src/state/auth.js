import { atom, selector } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: (() => {
    try {
      const raw = localStorage.getItem('auth');
      return raw ? JSON.parse(raw) : { token: null, user: null };
    } catch {
      return { token: null, user: null };
    }
  })(),
  effects: [
    ({ onSet }) => {
      onSet((val) => {
        localStorage.setItem('auth', JSON.stringify(val));
      });
    },
  ],
});

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({ get }) => {
    const { token } = get(authState);
    return Boolean(token);
  },
});






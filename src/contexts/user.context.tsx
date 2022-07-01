import React, { createContext, useState } from 'react';

export interface IUser {
  id: number;
  userName: string;
  password: string;
  loggedIn: boolean;
}

export type UserContextType = {
  currentUser: IUser;
  users: IUser[];
  saveUser: (user: IUser) => void;
  logInUser: (userName: string, password: string) => IUser[];
  logOutUser: (id: number) => void;
};

interface UserProviderProps {
  children?: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([
    {
      id: 1,
      userName: 'ana',
      password: 'Banana12',
      loggedIn: false,
    },
  ]);
  const [currentUser, setCurrentUser] = useState({} as IUser);

  const saveUser = (user: IUser) => {
    const newUser: IUser = {
      id: Math.random(),
      userName: user.userName,
      password: user.password,
      loggedIn: false,
    };
    setUsers([...users, newUser]);
  };

  const logInUser = (userName: string, password: string) => {
    const loggedUser = users.filter((user: IUser) => {
      if (user.userName === userName && user.password === password) {
        user.loggedIn = true;
        setUsers([...users]);
        setCurrentUser(user);
        return user;
      }
    });

    return loggedUser;
  };

  const logOutUser = (id: number) => {
    users.filter((user: IUser) => {
      if (user.id === id) {
        user.loggedIn = false;
        setUsers([...users]);
      }
    });
  };

  return (
    <UserContext.Provider value={{ currentUser, users, saveUser, logInUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const withUserProvider = (Component: React.ElementType) => (props: JSX.IntrinsicAttributes) =>
  (
    <UserProvider>
      <Component {...props} />
    </UserProvider>
  );

import React, {createContext, useContext} from 'react';
import type {FC} from 'react';

/*
    value속성은 제네릭함수 createContext<T>(defaultValue)의 타입 변수 T와 같아야
    합니다. 그러므로 ToggleTHemeContextType와 defaultToggleThemeContext를 수정해 준다.
*/

/*
    Context의 기본 type
*/
export type ToggleThemeContextType = {
  toggleTheme: () => void;
};

/* 
    Context의 기본 값
*/
const defaultToggleThemeContext = {
  toggleTheme: () => {},
};

const ToggleThemeContext = createContext<ToggleThemeContextType>(
  defaultToggleThemeContext,
);

type ToggleThemeContextProps = {
  toggleTheme: () => void;
};
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
  children,
  toggleTheme,
}) => {
  const value = {toggleTheme};
  return (
    <ToggleThemeContext.Provider value={value}>
      {children}
    </ToggleThemeContext.Provider>
  );
};
/*
    Provider컴포는트는 아래와 같이 value와 children속성이 있는 ProviderProps를 
    제공합니다. 여기서 T는 createContext<T>와 같아야 합니다.

    interface  ProviderProps<T> {
        value: T;
        children?: ReactNode
    }
*/

export const useToggleTheme = () => {
  const {toggleTheme} = useContext(ToggleThemeContext);
  return toggleTheme;
};

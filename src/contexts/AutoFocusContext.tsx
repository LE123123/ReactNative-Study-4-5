/* Provider 만들기 */
/* eslint-disable */
import React, {createContext, useContext, useRef, useCallback} from 'react';
import type {FC, ComponentProps} from 'react';
import {findNodeHandle} from 'react-native';
import type {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

export type FocusContextType = {
  autoFocus: (event: FocusEvent) => void;
};
const defaultFocusContext = {
  autoFocus: (event: FocusEvent) => {},
};

const AutoFocusContext = createContext<FocusContextType>(defaultFocusContext);

export type AutoFocusProviderProps = ComponentProps<
  typeof KeyboardAwareScrollView
>;

export const AutoFocusProvider: FC<AutoFocusProviderProps> = ({
  children,
  ...props
}) => {
  const scrollRef = useRef<KeyboardAwareScrollView | null>(null);
  const scrollToInput = useCallback((ReactNode: any) => {
    scrollRef.current?.scrollToFocusedInput(ReactNode);
  }, []);
  const autoFocus = useCallback((event: FocusEvent) => {
    scrollToInput(findNodeHandle(event.target));
  }, []);

  const value = {
    autoFocus,
  };
  return (
    <AutoFocusContext.Provider value={value}>
      <KeyboardAwareScrollView
        {...props}
        style={{flex: 1, width: '100%'}}
        ref={scrollRef}>
        {children}
      </KeyboardAwareScrollView>
    </AutoFocusContext.Provider>
  );
};

export const useAutoFocus = () => {
  const {autoFocus} = useContext(AutoFocusContext);
  return autoFocus;
};

/*
    AutoFocusProvider 컴포넌트와
    useAutoFocus 커스텀 훅의 초기 모습을 보여준다.
*/

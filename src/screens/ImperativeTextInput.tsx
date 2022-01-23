import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import type {ForwardRefRenderFunction} from 'react';
import {TextInput as RNTextInput, Keyboard} from 'react-native';
import {TextInput} from '../theme/paper';
import type {TextInputProps} from '../theme/paper';

export type TextInputMethods = {
  focus: () => void;
  dismiss: () => void;
};

export type ImperativeTextInputProps = TextInputProps;

// prettier-ignore
const ImperativeTextInput: ForwardRefRenderFunction<TextInputMethods, ImperativeTextInputProps> = 
  (props, ref) => {
  const textInputRef = useRef<RNTextInput | null>(null);
  useImperativeHandle(
    ref,
    /**
     * ESNEXT 자바스크립트는 focus: () => {} 형태의 코드를
     * 간결하게 focus() {} 형태로 사용하게 하는 구문을 제공한다
     */
    () => ({
      focus() {
        textInputRef.current?.focus();
      },
      dismiss() {
        Keyboard.dismiss();
      },
    }),
    [],
  );
  return <TextInput ref={textInputRef} {...props} />;
};

export default forwardRef(ImperativeTextInput);

/**
 * 테마 기능을 수행하지 않은 RNTextInput 보다는
 * 테마 기능을 수행한 TextInput을 사용하는 것이 좋을 것이다.
 *
 * => ImperativeTextInput은 테마 기능을 가지게 된다.
 */

import React, {forwardRef} from 'react';
import type {ForwardRefRenderFunction, ComponentProps /*FC*/} from 'react';
import {TextInput as RNTextInput} from 'react-native';
// import type {StyleProp, TextStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
/*
    ref 속성에 설정된 값을 얻어야 하는 컴포넌트는 반드시 다음 코드 패턴을 구현해야 한다
    1) 컴포넌트 타입은 ForwardRefRenderFunction<속성_타입>이여야 한다
    2) 컴포넌트 속성과 ref 속성을 ({속성, ref}) 형태로 수신한다.
    3) forwardRef(컴포넌트 타입)을 내보낸다.
*/

export type TextInputProps = ComponentProps<typeof RNTextInput> & {
  /*
        style속성 또는 FC타입이 제공하는 속성입니다.
        style?: StyleProp<TextStyle>;
    */
  /*
        TODO: 또한 여기서 한가지 문제가 발생하는데
        ref속성은 React-Native 코어 컴포넌트에만 적용되기 때문에
        props로 넘겨줄 수 없다 {...props} 불가

        여기서 forwardRef API로 생성한 사용자 정의 컴포넌트에서는 ref속성을 사용할 수 있습니다
        이름 그대로 부모 컴포넌트에서 생성한 ref를 자식 컴포넌트로 전달하는 역할을 합니다.
   */
};

// prettier-ignore
const _TextInput: ForwardRefRenderFunction<RNTextInput, TextInputProps> = (
    {style, ...props}, ref) => {
  const {colors} = useTheme();

  return (
    <RNTextInput ref={ref}
      style={[{color: colors.text, borderColor: colors.placeholder}, style]}
      {...props} />
  );
};

export const TextInput = forwardRef(_TextInput);

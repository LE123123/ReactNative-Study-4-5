/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useRef,
  useCallback,
  useState /*useImperativeHandle*/,
} from 'react';
// prettier-ignore
import {StyleSheet, Switch} from 'react-native';
import {Text, View} from '../theme/paper';
import {useTheme} from 'react-native-paper';
import {useToggleTheme, AutoFocusProvider, useAutoFocus} from '../contexts';
import * as D from '../data';
import ImperativeTextInput from './ImperativeTextInput';
import type {TextInputMethods} from './ImperativeTextInput';

export default function Themed() {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
  const {dark} = useTheme();
  const toggleTheme = useToggleTheme();

  const methodsRef = useRef<TextInputMethods | null>(null);
  const setFocus = useCallback(() => methodsRef.current?.focus(), []);
  const dismissKeyboard = useCallback(() => methodsRef.current?.dismiss(), []);

  const autoFocus = useAutoFocus();

  return (
    <View surface style={[styles.view]}>
      <View accent style={[styles.topBar]}>
        <Text style={[styles.textButton]} onPress={setFocus}>
          focus
        </Text>
        <Text style={[styles.textButton]} onPress={dismissKeyboard}>
          dismiss keyboard
        </Text>
        <View style={[styles.view]} />
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
      <AutoFocusProvider contentContainerStyle={[styles.flex]}>
        <View style={[styles.flex]} />
        <View style={[styles.textView]}>
          <Text style={[styles.text]}>email</Text>
          <ImperativeTextInput
            ref={methodsRef}
            style={[styles.textInput]}
            value={person.email}
            placeholder="enter your email"
            onFocus={autoFocus}
            onChangeText={email => setPerson(person_ => ({...person_, email}))}
          />
        </View>
        <View style={[styles.textView]}>
          <Text style={[styles.text]}>name</Text>
          <ImperativeTextInput
            ref={methodsRef}
            style={[styles.textInput]}
            value={person.email}
            placeholder="enter your name"
            onFocus={autoFocus}
            onChangeText={name => setPerson(person__ => ({...person__, name}))}
          />
        </View>
      </AutoFocusProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    padding: 5,
  },
  textButton: {
    marginLeft: 10,
    fontSize: 10,
  },
  textView: {
    padding: 5,
  },
  text: {
    fontSize: 24,
  },
  textInput: {
    fonSize: 24,
    borderWidth: 1,
    borderRadius: 5,
  },
  flex: {
    flex: 1,
  },
});

/**
 * const textInputRef = useRef<TextInput | null>(null)코드가 성립할 수 있는 이유는
 * TextInput코어 컴포넌트가 focus라는 메서드를 제공한다는 사실을 미리 알기 때문이다.
 */

/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useRef,
  useCallback,
  useState /*useImperativeHandle*/,
} from 'react';
// prettier-ignore
import {StyleSheet, Switch, TextInput as RNTextInput, Keyboard} from 'react-native';
import {TextInput, Text, View} from '../theme/paper';
import {useTheme} from 'react-native-paper';
import {useToggleTheme, AutoFocusProvider, useAutoFocus} from '../contexts';
import * as D from '../data';

export default function Themed() {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
  const {dark} = useTheme();
  const toggleTheme = useToggleTheme();

  const textInputRef = useRef<RNTextInput | null>(null);
  const setFocus = useCallback(
    () => textInputRef.current?.focus(),
    [textInputRef.current],
  );
  const autoFocus = useAutoFocus();

  return (
    <View surface style={[styles.view]}>
      <View accent style={[styles.topBar]}>
        <Text style={[styles.textButton]} onPress={setFocus}>
          focus
        </Text>
        <Text style={[styles.textButton]} onPress={Keyboard.dismiss}>
          dismiss keyboard
        </Text>
        <View style={[styles.view]} />
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
      <AutoFocusProvider contentContainerStyle={[styles.flex]}>
        <View style={[styles.flex]} />
        <View style={[styles.textView]}>
          <Text style={[styles.text]}>email</Text>
          <TextInput
            ref={textInputRef}
            style={[styles.textInput]}
            value={person.email}
            placeholder="enter your email"
            onFocus={autoFocus}
            onChangeText={email => setPerson(person_ => ({...person_, email}))}
          />
        </View>
        <View style={[styles.textView]}>
          <Text style={[styles.text]}>name</Text>
          <TextInput
            ref={textInputRef}
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

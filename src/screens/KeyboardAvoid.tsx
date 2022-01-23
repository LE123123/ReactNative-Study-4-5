/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useCallback, useMemo} from 'react';
// prettier-ignore
import {StyleSheet, View, Text, Switch, TextInput, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useToggleTheme} from '../contexts';
import * as D from '../data';

export default function Input() {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
  const {dark, colors} = useTheme();
  const toggleTheme = useToggleTheme();
  const textInputRef = useRef<TextInput | null>(null);

  const setFocus = useCallback(
    () => textInputRef.current?.focus(),
    [textInputRef.current],
  );

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const textInputStyle = useMemo(
    () => [
      styles.textInput,
      {color: colors.text, borderColor: colors.placeholder},
    ],
    [colors.text, colors.placeholder],
  );

  return (
    <View style={[styles.view, {backgroundColor: colors.surface}]}>
      <View style={[styles.topBar, {backgroundColor: colors.accent}]}>
        <Text style={[styles.textButton]} onPress={setFocus}>
          focus
        </Text>
        <Text style={[styles.textButton]} onPress={dismissKeyboard}>
          dismiss keyboard
        </Text>
        <View style={[styles.view]} />
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
      <KeyboardAvoidingView
        style={[styles.flex]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.flex]} />
        <View style={[styles.textView]}>
          <Text style={[styles.text, {color: colors.text}]}>email</Text>
          <TextInput
            ref={textInputRef}
            style={[
              styles.textInput,
              {color: colors.text, borderColor: colors.placeholder},
            ]}
            value={person.email}
            placeholder="enter your email"
            onChangeText={email => setPerson(person_ => ({...person_, email}))}
          />
        </View>
        <View style={[styles.textView]}>
          <Text style={[styles.text, {color: colors.text}]}>name</Text>
          <TextInput
            ref={textInputRef}
            style={textInputStyle}
            value={person.name}
            placeholder="enter your name"
            onChangeText={name => setPerson(person__ => ({...person__, name}))}
          />
        </View>
      </KeyboardAvoidingView>
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
    fontSize: 20,
  },
  textView: {
    padding: 5,
  },
  text: {
    fontSize: 20,
  },
  textInput: {
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 5,
  },
  flex: {
    flex: 1,
  },
});

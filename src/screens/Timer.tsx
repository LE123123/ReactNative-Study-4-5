/* eslint-disable */
import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Button} from 'react-native';
import {Colors} from 'react-native-paper';
// import * as D from '../data';

/* custom-hooks */
import {useToggle, useTimeout} from '../hooks';

export default function Timer() {
  // const [loading, setLoading] = useState<boolean>(true);
  // const toggleLoading = useCallback(
  //   () => setLoading(prevLoading => !prevLoading),
  //   [],
  // );

  // useEffect(() => {
  //   const id = setTimeout(() => setLoading(false), 3000);
  //   return () => clearTimeout(id);
  // }, [loading]);

  /* custom-hooks */

  // 처음에는 당연히 true로 설정해 주어야 한다.
  const [loading, toggleLoading] = useToggle(true);
  /*
    무한 호출문제를 해결하기 위해서 어떻게 해야 할까
    loading의 값이 true가 될떄에만 콜백함수가 동작하게 하면 되지
  */
  useTimeout(() => loading && toggleLoading(), 1000, [loading]);

  return (
    <View style={[styles.view]}>
      <Text style={[styles.title]}>Timer</Text>
      <Text>Loading: {loading.toString()}</Text>
      <Button
        onPress={toggleLoading}
        title={loading ? 'stop loading' : 'start loading'}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color={Colors.deepPurple700.toString()}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.yellow300.toString(),
  },
  title: {fontSize: 30, fontWeight: '600'},
});

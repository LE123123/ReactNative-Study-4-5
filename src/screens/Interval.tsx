/* eslint-disable */
import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Colors} from 'react-native-paper';
import {Avatar} from '../components';
import * as D from '../data';
import {useToggle, useInterval} from '../hooks';

/* 
  IPerson의 모든 속성을 사용하지 않고 단지 'id'와 'avatar'란 속성이 있는 새로운 타입을 만들고 싶으면
  아래와 같이 구현해야 한다.
*/
type IdAndAvatar = Pick<D.IPerson, 'id' | 'avatar'>;

export default function Interval() {
  const [avatars, setAvatars] = useState<IdAndAvatar[]>([]);
  // const [start, setStart] = useState<boolean>(true);
  // const toggleStart = useCallback(() => setStart(prevState => !prevState), []);
  const clearAvatars = useCallback(() => setAvatars(() => []), []);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     if (start) {
  //       setAvatars(avatars_ => [
  //         ...avatars_,
  //         {id: D.randomId(), avatar: D.randomAvatarUrl()},
  //       ]);
  //     }
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, [start]);

  /* custom-hooks */
  const [start, toggleStart] = useToggle(true);

  useInterval(
    () =>
      start &&
      setAvatars(avatars_ => [
        ...avatars_,
        {id: D.randomId(), avatar: D.randomAvatarUrl()},
      ]),
    1000,
    [start],
  );

  // prettier-ignore
  const children = avatars.map(({id, avatar}) => {
    return (
      <Avatar key={id} uri={avatar} size={70} viewStyle={styles.avatarViews} />
    );
  });
  return (
    <View style={[styles.view]}>
      <View style={styles.topBar}>
        <Text onPress={toggleStart} style={styles.topBarText}>
          {start ? 'stop' : 'start'}
        </Text>
        <Text onPress={clearAvatars} style={styles.topBarText}>
          clear avatars
        </Text>
      </View>
      <Text style={styles.title}>Interval</Text>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {children}
      </ScrollView>
    </View>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
  view: {
    flex: 1,

    backgroundColor: Colors.lime300.toString(),
    alignItems: 'center',
  },
  avatarViews: {},
  topBar: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.blue500.toString(),
  },
  topBarText: {
    fontSize: 20,
    color: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

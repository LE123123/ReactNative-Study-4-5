/* eslint-disable */
import React, {useMemo} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Colors} from 'react-native-paper';
import color from 'color';
import * as D from '../data';
import Person from './Person';
import {useClock} from '../hooks/useClock';

const title = 'Cache';

const Cache = () => {
  const time = useClock();

  const people = useMemo(() => {
    return D.makeArray(2).map(D.createRandomPerson);
  }, []);
  /*
    [] 의존성 목록에 time을 집어넣게 되면
    1초에 한번씩 useMemo콜백 함수가 1초에 한번씩 실행되며 이름이 1초에 한번씩
    바뀌게 된다.
  */
  return (
    <View style={[styles.view]}>
      <Text style={[styles.text]}>{title}</Text>
      <FlatList
        style={[styles.flatList]}
        data={people}
        renderItem={({item}) => <Person person={item} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={[styles.itemSeparator]} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.blue900,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  flatList: {
    width: '100%',
  },
  itemSeparator: {
    borderWidth: 1,
    borderColor: color(Colors.grey500).lighten(0.5).string(),
  },
});

export default Cache;

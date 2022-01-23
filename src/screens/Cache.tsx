/* eslint-disable */
import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Colors} from 'react-native-paper';
import color from 'color';
import * as D from '../data';
import Person from './Person';
import {createOrUse} from './createOrUse';
import {useClock} from '../hooks';

const title = 'Cache';

const Cache = () => {
  const time = useClock();

  const people = createOrUse('people', () =>
    // 재렌더링할 때마다 호출하므로 비효율적이다.
    D.makeArray(2).map(D.createRandomPerson),
  );
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

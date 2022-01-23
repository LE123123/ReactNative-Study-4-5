/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Colors} from 'react-native-paper';
import * as D from '../data';
import {fibonacci} from './fibonacci';

const title = 'Fibo';

const Fibo = () => {
  // useMemo훅을 사용하여 fibonacci함수가 계산한 값을 메모합니다.
  // 처음만 하게 의존성 리스트를 비워준다.
  const memoizedFibonacci = useMemo(() => fibonacci, []);

  const fibos = useMemo(() => {
    return D.makeArray(20 + 1).map((notUsed, index) => ({
      number: index,
      fibonacci: memoizedFibonacci(index),
    }));
  }, []);
  return (
    <View style={[styles.view]}>
      <Text style={[styles.text]}>{title}</Text>
      <FlatList
        contentContainerStyle={[styles.contentContainerStyle]}
        data={fibos}
        renderItem={({item}) => (
          <Text style={[styles.text]}>
            {item.number}: {item.fibonacci}
          </Text>
        )}
        keyExtractor={item => item.number.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 5,
    backgroundColor: Colors.blue900,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
});

export default Fibo;

/* eslint-disable */
import React, {useCallback} from 'react';
import type {Dispatch, SetStateAction} from 'react';
import type {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from 'react-native-paper';
import * as D from '../data';

/* people의 상태를 조정할 수 있는 setter를 받아들인다. */
export type TopBarProps = {
  setPeople: Dispatch<SetStateAction<D.IPerson[]>>;
};

const TopBar: FC<TopBarProps> = ({setPeople}) => {
  const add = useCallback(() => {
    /* TODO: 구현이 필요함 */
    /* 
        setPeople(previousPeople => [...previousPeople, D.createRandomPerson()]) 
        과 같은 형태로 구현해야 한다.
    */
    setPeople(prevPeople => [...prevPeople, D.createRandomPerson()]);
  }, []);

  const deleteAll = useCallback(() => {
    /* TODO: 구현이 필요함 */
    /*
        setPeople(notUsed => [])
        과 같은 형태로 구현해야 한다.
    */
    setPeople(() => []);
  }, []);

  return (
    <View style={[styles.topBar]}>
      <Text style={[styles.textButton]} onPress={add}>
        add
      </Text>
      <Text style={[styles.textButton]} onPress={deleteAll}>
        delete all
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.lightBlue700.toString(),
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
});

export default TopBar;

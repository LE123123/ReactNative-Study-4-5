/* eslint-disable */
import axios from 'axios';
import * as D from '../data';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Colors} from 'react-native-paper';
import Country from './Country';
import {useAsync} from '../hooks';

const Fetch = () => {
  const [countries, setCountries] = useState<D.ICountry[]>([]);

  // const [error, setError] = useState<Error | null>(null);
  // useEffect(() => {
  //   const ex = async () => {
  //     const countries = await D.getCountries();
  //     console.log(countries);
  //     // setCountries(countries);
  //   };
  //   ex().catch(setError);
  // }, []);

  /* custom-hooks */
  const [error, resetError] = useAsync(async () => {
    setCountries([]);
    resetError();
    await Promise.reject(new Error('somne error occurs'));
    const countries = await D.getCountries();
    setCountries(countries);
  });

  return (
    <View style={[styles.view]}>
      <Text style={[styles.title]}>Fetch</Text>
      {error && <Text>{error.message}</Text>}
      <FlatList
        data={countries}
        renderItem={({item}) => <Country country={item} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={[styles.separator]} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.blue100.toString(),
  },
  title: {fontSize: 30, fontWeight: '600'},
  separator: {
    borderBottomColor: Colors.blue50.toString(),
    borderBottomWidth: 1,
  },
});

export default Fetch;

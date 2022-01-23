/* eslint-disable */
import React, {useLayoutEffect, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {Colors} from 'react-native-paper';
import type {LayoutChangeEvent} from 'react-native';
// import * as D from '../data';

/* custom-hook */
import {useLayout} from '../hooks';

const title = 'LifeCycle';
export default function LifeCycle() {
  // useEffect(() => {
  //   console.log(Platform.OS, 'useEffect called');
  //   return () => console.log(Platform.OS, 'useEffect finished');
  // }, []);

  // useLayoutEffect(() => {
  //   console.log(Platform.OS, 'useLayoutEffect called');
  //   return () => console.log(Platform.OS, 'useLayoutEffect finished');
  // }, []);

  // const onLayout = useCallback((e: LayoutChangeEvent) => {
  //   const {layout} = e.nativeEvent;
  //   console.log(Platform.OS, 'onLayout called', layout);
  // }, []);
  // console.log(Platform.OS, 'render start');

  /* custom-hook */
  const [layout, setLayout] = useLayout();

  return (
    <View onLayout={setLayout} style={[styles.view]}>
      <Text style={[styles.title]}>{title}</Text>
      <Text>layout: {JSON.stringify(layout, null, 2)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.blue100,
    alignItems: 'center',
  },
  title: {fontSize: 30, fontWeight: '600'},
});

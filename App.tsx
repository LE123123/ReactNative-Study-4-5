/* ch04_2 ~ ch04_3 */
// /* eslint-disable */
// import React, {useMemo, useState} from 'react';
// import type {FC} from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
//   Text,
//   View,
//   FlatList,
// } from 'react-native';
// import {Colors} from 'react-native-paper';
// import PersonUsingValueState from './src/screens/PersonUsingValueState';
// import PersonUsingObjectState from './src/screens/PersonUsingObjectState';
// import PersonUsingPassingState from './src/screens/PersonUsingPassingState';
// import * as D from './src/data';
// import TopBar from './src/screens/TopBar';

// const {width} = Dimensions.get('window');

// type PersonInformation = {
//   title: string;
//   Component: FC<any>;
// };

// const personInformations: PersonInformation[] = [
//   {title: 'PersonUsingValueState', Component: PersonUsingValueState},
//   {title: 'PersonUsingObjectState', Component: PersonUsingObjectState},
//   {title: 'PersonUsingPassingState', Component: PersonUsingPassingState},
// ];

// const numberOfComponents = personInformations.length;

// const App = () => {
//   // const people = useMemo(() => D.makeArray(10).map(D.createRandomPerson), []);
//   const [people, setPeople] = useState<D.IPerson[]>([]);
//   const children = useMemo(
//     () =>
//       personInformations.map(({title, Component}: PersonInformation) => (
//         <View style={[styles.flex]} key={title}>
//           <Text style={[styles.text]}>{title}</Text>
//           <FlatList
//             data={people}
//             renderItem={({item}) => <Component person={item} />}
//             keyExtractor={(item, index) => index.toString()}
//             ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
//           />
//         </View>
//       )),
//     /* 다음과 같이 people.length값이 바뀔 때마다 useMemo훅이 다시 캐시 되도록 하는 부분이 추가되어야 한다. */
//     [people],
//   );
//   return (
//     <SafeAreaView style={[styles.flex]}>
//       <TopBar /*{...{setPeople}}*/ setPeople={setPeople} />
//       <ScrollView
//         horizontal
//         contentContainerStyle={[styles.horizontalScrollView]}>
//         {children}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   itemSeparator: {
//     borderWidth: 1,
//     borderColor: Colors.grey500,
//   },
//   horizontalScrollView: {
//     width: width * numberOfComponents,
//     borderColor: 'black',
//   },
//   text: {
//     fontSize: 24,
//     textAlign: 'center',
//   },
// });

// export default App;

/* TODO: ch04_4 */
/* eslint-disable */
// import React, {
//   useState,
//   useMemo,
//   useCallback,
//   useEffect,
//   useLayoutEffect,
// } from 'react';
// import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
// import {Colors} from 'react-native-paper';
// import LifeCycle from './src/screens/LifeCycle';
// import Timer from './src/screens/Timer';
// import Interval from './src/screens/Interval';
// import Fetch from './src/screens/Fetch';

// const App = () => {
//   const selects = useMemo(
//     () => ['lifeCycle', 'timer', 'interval', 'fetch'],
//     [],
//   );
//   const [select, setSelect] = useState<string>(selects[0]);

//   const onPress = useCallback(text => () => setSelect(text), []);
//   const buttons = useMemo(() => {
//     return selects.map(text => {
//       return (
//         <Text key={text} onPress={onPress(text)} style={[styles.button]}>
//           {text}
//         </Text>
//       );
//     });
//   }, []);

//   return (
//     <SafeAreaView style={[styles.safeAreaView]}>
//       <View style={[styles.topBar]}>{buttons}</View>
//       {select === 'lifeCycle' && <LifeCycle />}
//       {select === 'timer' && <Timer />}
//       {select === 'interval' && <Interval />}
//       {select === 'fetch' && <Fetch />}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaView: {flex: 1},
//   topBar: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 5,
//     justifyContent: 'space-between',
//     backgroundColor: Colors.lightBlue500.toString(),
//   },
//   button: {
//     fontSize: 20,
//     color: 'white',
//   },
// });

// export default App;

/* TODO:  ch05_1 */
/* eslint-disable */

import React, {useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {Provider as PaperProvider} from 'react-native-paper';
import {DefaultTheme, DarkTheme} from 'react-native-paper';
// import MainNavigator from './src/screens/MainNavigator';
import MainNavigator2 from './src/screens/MainNavigator2';
import {ToggleThemeProvider} from './src/contexts';

const App = () => {
  const scheme = useColorScheme();
  /* shceme이 dark이라면 DarkTheme로 아니라면 DefaultTheme로 설정 해준다 */
  const [theme, setTheme] = useState(
    scheme === 'dark' ? DarkTheme : DefaultTheme,
  );
  // console.log('scheme', scheme);
  // console.log('theme', JSON.stringify(theme, null, 2));

  const toggleTheme = useCallback(
    () => setTheme(theme => (theme.dark ? DefaultTheme : DarkTheme)),
    [],
  );

  return (
    <AppearanceProvider>
      <PaperProvider theme={theme}>
        <ToggleThemeProvider toggleTheme={toggleTheme}>
          <SafeAreaView style={[styles.safeAreaView]}>
            <MainNavigator2 />
          </SafeAreaView>
        </ToggleThemeProvider>
      </PaperProvider>
    </AppearanceProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
});

export default App;

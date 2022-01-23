/* eslint-disable */
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import color from 'color';
import Person from './Person';

export const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    backgroundColor: Colors.lime100,
    padding: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: color(Colors.blue500).lighten(0.5).string(),
    borderWidth: 2,
  },
  nameEmailView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {marginRight: 5, fontSize: 22, fontWeight: '500'},
  email: {
    textDecorationLine: 'underline',
    color: Colors.blue500,
    textDecorationColor: 'Colors.blue500',
  },
  dateView: {flexDirection: 'row', justifyContent: 'space-between'},
  createdDate: {},
  text: {},
  image: {
    height: 150,
    marginTop: 15,
  },
  counts: {},
  leftView: {padding: 5},
  rightView: {flex: 1, padding: 5, marginRight: 10},
  comments: {
    marginTop: 10,
    fontSize: 16,
  },
  countsView: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'space-between',
  },
  touchableIcon: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  iconText: {
    color: Colors.deepPurple500,
    marginLeft: 3,
  },
});

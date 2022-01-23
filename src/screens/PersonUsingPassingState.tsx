/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, {useCallback, useState} from 'react';
import type {FC} from 'react';
import {Text, View, Image, Alert} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import * as D from '../data';
import {Avatar, IconText} from '../components';
import {styles} from './Person.style';
import PersonIcons from './PersonIcons';

moment.locale('ko');
export type PersonProps = {
  person: D.IPerson;
};

// prettier-ignore
const PersonUsingPassingState: FC<PersonProps> = ({person: initialPerson}) => {
    const [person, setPerson] = useState<D.IPerson>({
      ...initialPerson,
      counts: {
        comment: initialPerson.counts.comment,
        retweet: initialPerson.counts.retweet,
        heart: initialPerson.counts.heart
      }
    });
  const avatarPressed = useCallback(() => Alert.alert('avatar pressed'), []);
  const deletePressed = useCallback(() => Alert.alert('delete pressed'), []);

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          imageStyle={[styles.avatar]}
          uri={person.avatar}
          size={50}
          onPress={avatarPressed}/>
      </View>
      <View style={[styles.rightView]}>
        <Text style={[styles.name]}>{person.name}</Text>
        <Text style={[styles.email]}>{person.email}</Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.text]}>
            {moment(person.createdDate).startOf('day').fromNow()}
          </Text>
          <Icon name="trash-can-outline" size={26} color={Colors.lightBlue500} onPress={deletePressed}></Icon>
        </View>
        <Text numberOfLines={3} ellipsizeMode='tail' style={[styles.text, styles.comments]}>
          {person.comments}
        </Text>
        <Image style={[styles.image]} source={{uri: person.image}} />
        <PersonIcons person={person} setPerson={setPerson}/>
      </View>
    </View>
  );
};

export default PersonUsingPassingState;

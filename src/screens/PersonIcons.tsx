/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, {useCallback} from 'react';
import type {FC, Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native-paper';
import {styles} from './Person.style';
import {IconText} from '../components/IconText';
import * as D from '../data';

export type PersonIconProps = {
  person: D.IPerson;
  /* person의 setter의 타입을 정의해준다. ( props로 받기 위함 ) */
  setPerson: Dispatch<SetStateAction<D.IPerson>>;
};

// prettier-ignore
const PersonIcons: FC<PersonIconProps> = ({person: initialPerson, setPerson}) => {
  const commentIconPressed = useCallback(() => 
    setPerson(person => ({
      ...person,
      counts: {
        ...person.counts,
        comment: person.counts.comment + 1
      }
    }))
  , []);

  const retweetIconPressed = useCallback(() => 
    setPerson(person => ({
      ...person,
      counts: {
        ...person.counts,
        retweet: person.counts.retweet + 1
      }
    }))
  , []);

  const heartIconPressed = useCallback(() => 
    setPerson(person => ({
      ...person,
      counts: {
        ...person.counts,
        heart: person.counts.heart + 1
      }
    }))
  , []);

  return (
        <View style={[styles.countsView]}>
        <IconText viewStyle={[styles.touchableIcon]}
          onPress={commentIconPressed}
          name="comment" size={24} color={Colors.blue500}
          textStyle={[styles.iconText]} text={initialPerson.counts.comment}
        />
        <IconText viewStyle={[styles.touchableIcon]}
          onPress={retweetIconPressed}
          name="twitter-retweet" size={24} color={Colors.purple500}
          textStyle={[styles.iconText]} text={initialPerson.counts.retweet}
        />
        <IconText viewStyle={[styles.touchableIcon]}
          onPress={heartIconPressed}
          name="heart" size={24} color={Colors.red500}
          textStyle={[styles.iconText]} text={initialPerson.counts.heart}
        />    
    </View>
  );
};

export default PersonIcons;

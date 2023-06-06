import React, { useMemo } from 'react';
import { ListItem } from '../state/listContext';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  item: ListItem;
  isLast: boolean;
};

export default function ListRow({ item, isLast }: Props) {
  const styles = useMemo(() => getStyles(isLast), [isLast]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{item.title}</Text>
    </View>
  );
}

const getStyles = (isLast: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderBottomColor: 'silver',
      borderBottomWidth: isLast ? 0 : 1,
    },
    label: {
      fontSize: 16,
    },
  });

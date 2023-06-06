import React, { useMemo } from 'react';
import { ListItem } from '../state/listContext';
import { Text } from 'tamagui';
import { StyleSheet, View } from 'react-native';

type Props = {
  item: ListItem;
  isLast: boolean;
};

export default function ListRow({ item, isLast }: Props) {
  const styles = useMemo(() => getStyles(isLast), [isLast]);

  return (
    <View style={styles.container}>
      <Text fontSize="$5">{item.title}</Text>
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

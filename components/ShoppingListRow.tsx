import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypoicons from '@expo/vector-icons/Entypo';

type Props = {
  isFirst: boolean;
  isLast: boolean;
  listId: string;
  title: string;
  count: number;
};

export default function ShoppingListRow({
  isFirst,
  isLast,
  listId,
  title,
  count,
}: Props) {
  const styles = useMemo(() => getStyles(isFirst, isLast), [isFirst, isLast]);
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push({ pathname: listId });
      }}
    >
      <Text style={styles.label}>{title}</Text>
      <View style={styles.right}>
        <Text style={styles.count}>{count}</Text>
        <Entypoicons name="chevron-small-right" size={24} color={'gray'} />
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (isFirst: boolean, isLast: boolean) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderBottomColor: 'silver',
      borderBottomLeftRadius: isLast ? 8 : undefined,
      borderBottomRightRadius: isLast ? 8 : undefined,
      borderBottomWidth: isLast ? 0 : 1,
      borderTopLeftRadius: isFirst ? 8 : undefined,
      borderTopRightRadius: isFirst ? 8 : undefined,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    label: {
      fontSize: 16,
    },
    right: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    count: {
      color: 'grey',
    },
  });

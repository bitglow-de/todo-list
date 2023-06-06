import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useList } from '../state/listContext';
import ShoppingListRow from '../components/ShoppingListRow';
import { H3 } from 'tamagui';

export default function Home() {
  const [state] = useList();

  const listIds = Object.keys(state);
  return (
    <View style={styles.container}>
      <FlatList
        data={listIds}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<H3>{'Todo List App 📝'}</H3>}
        renderItem={({ item: listId, index }) => (
          <ShoppingListRow
            listId={listId}
            title={state[listId].title}
            isFirst={index === 0}
            isLast={index === listIds.length - 1}
            count={Object.keys(state[listId].data).length}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
  },
  list: {
    margin: 15,
  },
});

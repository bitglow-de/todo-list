import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useList } from '../state/listContext';
import ShoppingListRow from '../components/ShoppingListRow';
import { H3, Separator, YStack } from 'tamagui';

export default function Home() {
  const [state] = useList();
  const listIds = Object.keys(state);

  const renderSeparator = useCallback(() => <Separator />, []);

  return (
    <YStack flex={1} px="$2.5" py="$4">
      <FlatList
        data={listIds}
        ListHeaderComponent={<H3>{'Todo List App 📝'}</H3>}
        ItemSeparatorComponent={renderSeparator}
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
    </YStack>
  );
}

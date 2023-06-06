import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Input, Separator, Text, XStack, YStack, useTheme } from 'tamagui';
import { TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { ListItem, useList } from '../state/listContext';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import ListRow from '../components/ListRow';

export default function Detail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { listId } = useLocalSearchParams();
  const [state, dispatch] = useList();
  const [value, setValue] = useState('');
  const theme = useTheme();
  const backgroundColor = theme.background.val;

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  const renderSeparator = useCallback(() => <Separator />, []);

  const renderAddButton = (): React.ReactNode => {
    return (
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef.current?.expand();
        }}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    );
  };

  if (typeof listId !== 'string') {
    return null;
  }

  const items = state[listId].data;
  const headerTitle = state[listId].title;
  const listData = Object.keys(items).map<ListItem>((itemId) => items[itemId]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle,
          headerRight: renderAddButton,
        }}
      />
      <YStack flex={1} px="$2.5" py="$4">
        <FlatList
          data={listData}
          renderItem={({ item, index }) => (
            <ListRow
              item={item}
              isFirst={index === 0}
              isLast={index === listData.length - 1}
            />
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      </YStack>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['65%']}
        animateOnMount={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor }}
      >
        <YStack px="$2.5" flex={1}>
          <XStack jc="space-between" ai="center">
            <Text
              onPress={() => {
                bottomSheetRef.current.close();
                Keyboard.dismiss();
              }}
            >
              Cancel
            </Text>
          </XStack>
          <Separator mt="$3" />
          <Input
            mt="$4"
            value={value}
            onChangeText={setValue}
            clearButtonMode="always"
            onSubmitEditing={() => {
              bottomSheetRef.current.close();
              if (value) {
                dispatch({
                  type: 'ADD_ITEM',
                  payload: { listId, item: { title: value } },
                });
                setValue('');
              }
            }}
            returnKeyType="done"
          />
        </YStack>
      </BottomSheet>
    </>
  );
}

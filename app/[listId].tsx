import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Text } from 'tamagui';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import { ListItem, useList } from '../state/listContext';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import ListRow from '../components/ListRow';

export default function Detail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { listId } = useLocalSearchParams();
  const [state, dispatch] = useList();
  const [value, setValue] = useState('');

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
      <FlatList
        data={listData}
        renderItem={({ item, index }) => (
          <ListRow item={item} isLast={index === listData.length - 1} />
        )}
        contentContainerStyle={styles.list}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['65%']}
        animateOnMount={false}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetActionsContainer}>
            <TouchableOpacity
              onPress={() => {
                bottomSheetRef.current.close();
                Keyboard.dismiss();
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <TextInput
            style={styles.textInput}
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
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheet: { paddingHorizontal: 15 },
  bottomSheetActionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: 'silver' },
  textInput: {
    backgroundColor: 'silver',
    borderRadius: 4,
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  list: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 15,
  },
});

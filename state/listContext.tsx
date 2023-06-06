import React, { useReducer } from 'react';

export type ShoppingListItem = {
  data: {
    [id: number]: ListItem;
  };
  title: string;
};

export type ListItem = {
  title: string;
};

export type ListState = {
  [listId: string]: ShoppingListItem;
};

const initialState: ListState = {
  shopping: {
    title: 'Shopping',
    data: {
      0: { title: 'bread 🍞' },
      1: { title: 'pasta 🍝' },
      2: { title: 'butter 🧈' },
      3: { title: 'cheese 🧀' },
      4: { title: 'bananas 🍌' },
      5: { title: 'grapes 🍇' },
    },
  },
  holiday: {
    title: 'Holiday',
    data: {
      0: { title: 'Pick up rental car' },
      1: { title: 'Check into hotel' },
      2: { title: 'Sign up for snorkeling for four' },
      3: { title: 'Book dinner reservations' },
    },
  },
  reminders: {
    title: 'Reminders',
    data: {
      0: { title: 'Pickup arts & crafts supplies' },
      1: { title: 'Send cookie recipe to Rigo' },
      2: { title: 'Book club prep' },
      3: { title: 'Hike with Darla' },
      4: { title: 'Schedule car maintenance' },
      5: { title: 'Cancel membership' },
      6: { title: 'Check spare tire' },
    },
  },
};

export type ListAction = {
  type: 'ADD_ITEM';
  payload: {
    listId: string;
    item: ListItem;
  };
};

const listReducer = (state: ListState, action: ListAction): ListState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { listId, item } = action.payload;
      const listData = state[listId].data ?? {};
      listData[Object.keys(listData).length] = item;

      return {
        ...state,
        [listId]: {
          ...state[listId],
          data: listData,
        },
      };
    }
    default:
      return state;
  }
};

const ListContext = React.createContext<
  [ListState, React.Dispatch<ListAction>] | undefined
>(undefined);

function ListProvider(props: { children: React.ReactNode }) {
  const value = useReducer(listReducer, initialState);

  return (
    <ListContext.Provider value={value}>{props.children}</ListContext.Provider>
  );
}

function useList() {
  const context = React.useContext(ListContext);

  if (context === undefined) {
    throw new Error('useListContext must be used within a ListProvider');
  }

  return context;
}

export { ListProvider, useList };

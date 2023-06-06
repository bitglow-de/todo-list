import React from 'react';
import { ListItem } from '../state/listContext';
import { Text, YStack } from 'tamagui';

type Props = {
  item: ListItem;
  isFirst: boolean;
  isLast: boolean;
};

export default function ListRow({ item, isFirst, isLast }: Props) {
  const bottomBorderRadius = isLast ? 8 : undefined;
  const topBorderRadius = isFirst ? 8 : undefined;

  return (
    <YStack
      bc="$background"
      px="$2.5"
      py="$2"
      bbrr={bottomBorderRadius}
      bblr={bottomBorderRadius}
      btlr={topBorderRadius}
      btrr={topBorderRadius}
    >
      <Text fontSize="$5">{item.title}</Text>
    </YStack>
  );
}

import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, XStack } from 'tamagui';
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
  const router = useRouter();

  const bottomBorderRadius = isLast ? 8 : undefined;
  const topBorderRadius = isFirst ? 8 : undefined;

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: listId });
      }}
    >
      <XStack
        jc="space-between"
        bc="$background"
        bbrr={bottomBorderRadius}
        bblr={bottomBorderRadius}
        btlr={topBorderRadius}
        btrr={topBorderRadius}
        px="$3"
        py="$3"
      >
        <Text fontSize="$5">{title}</Text>
        <XStack ai="center">
          <Text fontSize="$3" col="$gray10">
            {count}
          </Text>
          <Text col="$gray10">
            <Entypoicons name="chevron-small-right" size={24} />
          </Text>
        </XStack>
      </XStack>
    </TouchableOpacity>
  );
}

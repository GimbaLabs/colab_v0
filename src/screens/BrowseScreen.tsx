import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { Colors, Buttons, Typography, Sizing, Outlines } from "styles/index";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { SearchIcon } from "icons/index";
import { browseFeatured } from "../api_data/browseFeatured";
import { HorizontalCardsList } from "components/lists/HorizontalCardsList";

export interface BrowseProps
  extends StackScreenProps<OrganizerTabParamList, "Browse"> {
  children: React.ReactNode;
}

export const BrowseScreen = ({ navigation }: BrowseProps) => {
  const { colorScheme } = appContext();

  const renderFeaturedLists = React.useCallback(() => {
    //@TODO make more unique key id in production
    return browseFeatured.map((list, index) => (
      <HorizontalCardsList key={index} list={list} />
    ));
  }, [browseFeatured]);

  return (
    <SafeAreaView
      style={[
        colorScheme == "light" ? styles.safeArea_light : styles.safeaArea_dark,
      ]}>
      <View style={styles.container}>
        <View style={styles.searchToolContainer}>
          <SearchIcon
            width={28}
            height={28}
            stroke={
              colorScheme === "light"
                ? Colors.primary.s800
                : Colors.primary.neutral
            }
            strokeWidth={1.6}
          />
        </View>
      </View>
      <ScrollView style={styles.main}>{renderFeaturedLists()}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
    alignItems: "center",
  },
  safeaArea_dark: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
    alignItems: "center",
  },
  container: {
    width: "90%",
  },
  searchToolContainer: {
    alignItems: "flex-end",
    marginVertical: Sizing.x10,
  },
  main: {
    flex: 1,
    width: "100%",
  },
});

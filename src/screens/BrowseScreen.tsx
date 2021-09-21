import * as React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors, Sizing } from "styles/index";
import { BookingStackParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { SearchIcon } from "icons/index";
import { useEventsPagination } from "lib/hooks/useEventsPagination";
import { EventsList } from "components/booking/EventsList";
import { SubHeaderText } from "components/rnWrappers/subHeaderText";
// import { browseFeatured } from "../api_data/browseFeatured";

export interface BrowseProps
  extends StackScreenProps<BookingStackParamList, "Browse"> {
  children: React.ReactNode;
}

export const BrowseScreen = ({ navigation }: BrowseProps) => {
  const { colorScheme } = appContext();
  const { events, isLoading } = useEventsPagination();
  const isLightMode = colorScheme !== "dark";

  // const renderFeaturedLists = React.useCallback(() => {
  //   return browseFeatured.map((list, index) => (
  // <HorizontalCardsList navigateTo={navigateTo} key={index} list={list} />
  //   ));
  // }, [browseFeatured]);

  // const navigateTo = (params: BookingStackParamList["Available Dates"]) => {
  //   navigation.navigate("Available Dates", params);
  // };
  return (
    <SafeAreaView
      style={[isLightMode ? styles.safeArea_light : styles.safeaArea_dark]}>
      <View style={styles.container}>
        <View style={styles.searchToolContainer}>
          <SearchIcon
            width={24}
            height={24}
            stroke={
              colorScheme === "light"
                ? Colors.primary.s800
                : Colors.primary.neutral
            }
            strokeWidth={1.6}
          />
        </View>
      </View>
      <View style={styles.main}>
        {!!events.length && !isLoading ? (
          <EventsList eventsList={events} />
        ) : !events.length && isLoading ? (
          <ActivityIndicator
            animating={true}
            color={isLightMode ? Colors.primary.s800 : Colors.primary.neutral}
            size="large"
            style={{ paddingTop: Sizing.x35 }}
          />
        ) : (
          <View style={styles.noEventsMessage}>
            <SubHeaderText
              colors={[Colors.primary.s800, Colors.primary.neutral]}>
              Nothing yet to show...
            </SubHeaderText>
          </View>
        )}
      </View>
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
    width: "95%",
  },
  noEventsMessage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

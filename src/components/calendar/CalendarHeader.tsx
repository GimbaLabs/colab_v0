import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";

import { Buttons, Colors, Sizing, Outline, Typography } from "styles";
import { myCalendarContext } from "contexts/contextApi";

// This will enable LayoutAnimation on Android too.
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const CalendarHeader = () => {
  const { calendarHeader } = myCalendarContext();

  const [activeSearch, setActiveSearch] = React.useState<boolean>(false);
  const [nodeTag, setNodeTag] = React.useState<number | null>(null);

  const searchInputRef = React.useRef<TextInput>(null);

  // AnimationRef is used as reference to width value
  // const animatedScale = React.useRef(new Animated.Value(1)).current;

  const handleResponderEvent = (event: any) => {
    event.persist();
    if (nodeTag) {
      if (nodeTag === event.target) {
        return true;
      }
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSearch(false);
    Keyboard.dismiss();
    return true;
  };

  const setChildNodes = (component: any) => {
    if (component && component._children) {
      const childNativeTag = component._children[0]._nativeTag;
      setNodeTag(childNativeTag);
    }
  };

  const handleSearchPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSearch(true);

    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current!.focus();
    }
  };

  const calendarYear = calendarHeader ? calendarHeader.year : "";

  const calendarMonth = calendarHeader ? calendarHeader.month : "";

  return (
    <View
      onStartShouldSetResponder={(event) => handleResponderEvent(event)}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{calendarYear}</Text>
        <Text style={styles.headerText}>{"/"}</Text>
        <Text style={styles.headerText}>{calendarMonth}</Text>
      </View>
      {/* <View
        style={styles.searchBarView}
        ref={(component) => setChildNodes(component)}>
        <View style={styles.searchBar}>
          <Pressable
            onPress={handleSearchPress}
            style={[
              styles.searchBarButton,
              { width: activeSearch ? "85%" : "80%" },
            ]}>
            <SearchIcon
              style={styles.searchIcon}
              width={20}
              height={20}
              stroke={Colors.neutral.s600}
            />
            <TextInput
              ref={searchInputRef}
              placeholder={"Search"}
              clearTextOnFocus
              onPressIn={handleSearchPress}
              style={[
                styles.searchBarText,
                { width: activeSearch ? "75%" : "70%" },
              ]}></TextInput>
          </Pressable>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
  },
  header: {
    width: "50%",
    flexDirection: "row",
    marginHorizontal: Sizing.x15,
    marginVertical: Sizing.x5,
    alignSelf: "flex-end",
  },
  headerText: {
    ...Typography.header.x40,
    color: "white",
    paddingRight: 5,
  },
  searchBarView: {
    marginLeft: Sizing.x15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  searchBar: {
    flexDirection: "row-reverse",
    width: "50%",
  },
  searchBarButton: {
    ...Buttons.circular.primary,
    backgroundColor: Colors.neutral.s200,
    width: Sizing.x100,
    height: Sizing.x40,
    flexDirection: "row",
    marginRight: Sizing.x40,
    justifyContent: "flex-start",
  },
  searchAnimated: {
    ...Buttons.circular.primary,
    width: Sizing.x100,
    height: Sizing.x40,
  },
  searchIcon: {
    marginLeft: Sizing.x10,
  },
  searchBarText: {
    marginLeft: Sizing.x5,
    ...Typography.fontSize.x30,
  },
});

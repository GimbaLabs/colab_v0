import { LogBox } from "react-native";

// Ignore all log notifications:
LogBox.ignoreAllLogs();

import "react-native-gesture-handler";
import * as React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { HomeScreen } from "screens/index";
import { NavigationScreens } from "tabs/NavigationScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContextProvider } from "contexts/appContext";
import { AppStackParamList } from "common/types/navigationTypes";

// Error Handlers
import { setJSExceptionHandler } from "react-native-exception-handler";
import { jsErrorHandler } from "lib/errors";

setJSExceptionHandler(jsErrorHandler, true); // true - enables the error in dev mode

const Stack = createStackNavigator<AppStackParamList>();

function App() {
  let [fontsLoadaed] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoadaed) {
    return <AppLoading />;
  } else {
    return (
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="screen">
            <Stack.Screen
              name="Home"
              options={{ title: "Home" }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="Navigation Screens"
              component={NavigationScreens}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    );
  }
}

export default App;

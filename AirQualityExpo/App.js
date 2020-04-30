import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Home from "./src/screens/Home";
import ReadData from "./src/screens/ReadData";
import ViewMap from "./src/screens/ViewMap";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Settings from "./src/screens/Settings";
import Stats from "./src/screens/Stats";

const DrawerNavigation = createDrawerNavigator({
  Login: Login,
  Home: Home,
  ReadData: ReadData,
  ViewMap: ViewMap,
  Signup: Signup,
  Settings: Settings,
  Stats: Stats,
});

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation
    },
    Login: Login,
    Home: Home,
    ReadData: ReadData,
    ViewMap: ViewMap,
    Signup: Signup,
    Settings: Settings,
    Stats: Stats,
  },
  {
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(StackNavigation);

function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return isLoadingComplete ? <AppContainer /> : <AppLoading />;
  }
}
async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      "roboto-regular": require("./assets/fonts/roboto-regular.ttf"),
      "roboto-regular": require("./src/assets/fonts/roboto-regular.ttf")
    })
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default App;

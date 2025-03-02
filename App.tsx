import React from 'react';
import { LogBox } from 'react-native';
// import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/screens/routes';

// hide yellow box
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Routes />
    {/* //   <FlashMessage position="bottom" /> */}
    </GestureHandlerRootView>
  );
};

export default App;
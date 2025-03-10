import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Routes from './src/screens/routes';
import {store} from './src/store';

// hide yellow box
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <GestureHandlerRootView style={{flex: 1}}>
        <Routes />
        <FlashMessage position="bottom" />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

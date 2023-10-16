import 'react-native-gesture-handler';
import React from 'react';
import StackTabs from './Source/Navigators/StackNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {persistor, store} from './Source/Redux/Store';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackTabs />
      </PersistGate>
    </Provider>
  );
}

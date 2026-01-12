import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import RootNavigator from '@src/navigation/RootNavigator';
import { store } from '@src/store/store';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </>
  );
}

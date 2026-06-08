import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {RootNavigator} from '@/navigation/RootNavigator';
import {store} from '@/store';
import {colors} from '@/constants';

const App = () => <GestureHandlerRootView style={{flex: 1}}><Provider store={store}><SafeAreaProvider><StatusBar barStyle="dark-content" backgroundColor={colors.primary} /><RootNavigator /></SafeAreaProvider></Provider></GestureHandlerRootView>;
export default App;

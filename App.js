import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './Navigations/StackNavigation/StackNav';

function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}

export default App;
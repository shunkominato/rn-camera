import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import Home from './src/screen/Home';
import SignIn from './src/screen/SignIn';

const Stack = createNativeStackNavigator();
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff1f2',
  },
};

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={MyTheme}>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='Home' component={Home} />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

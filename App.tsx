import { createStaticNavigation } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { WatchlistProvider } from './src/context/WatchListContext';
import { AuthStack } from './src/navigation/AuthStack';
import { MainTap } from './src/navigation/MainTap';

const AuthNavigation = createStaticNavigation(AuthStack);
const MainNavigation = createStaticNavigation(MainTap);

function RootNavigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#171121' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return token ? <MainNavigation /> : <AuthNavigation />;
}

export default function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <RootNavigator />
      </WatchlistProvider>
    </AuthProvider>
  );
}

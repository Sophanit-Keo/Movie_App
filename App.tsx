import { createStaticNavigation } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AuthStack } from './src/Navigation/AuthStack';
import { MainTap } from './src/Navigation/MainTap';

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
      <RootNavigator />
    </AuthProvider>
  );
}

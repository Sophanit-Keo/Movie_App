import { createStaticNavigation } from '@react-navigation/native';
import { ActivityIndicator, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AuthStack } from './src/Navigation/AuthStack';
import { MainTap } from './src/Navigation/MainTap';
import MockStatusBar from './src/components/MockStatusBar';
import { WEB_PHONE_W as PHONE_W, WEB_PHONE_H as PHONE_H } from './src/constants/phone';
import { WatchlistProvider } from './src/context/WatchlistContext';

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
  const { width: winW, height: winH } = useWindowDimensions();

  if (Platform.OS === 'web') {
    const aspect = PHONE_H / PHONE_W;
    const frameW = Math.min(winW * 0.95, PHONE_W, (winH * 0.95) / aspect);
    const frameH = frameW * aspect;
    const contentH = frameH - 50;

    return (
      <View style={styles.outer}>
        <View style={[styles.phoneBody, { width: frameW + 10, height: frameH + 10, borderRadius: 58 }]}>
          <View style={[styles.screen, { width: frameW, height: frameH }]}>
            <View style={[styles.dynamicIsland, { width: frameW * 0.28 }]} />
            <MockStatusBar />
            <View style={{ width: frameW, height: contentH }}>
              <AuthProvider>
                <WatchlistProvider>
                  <RootNavigator />
                </WatchlistProvider>
              </AuthProvider>
            </View>
          </View>
        </View>
        <View style={[styles.btnMute,     { height: frameH * 0.05, top: frameH * 0.14 }]} />
        <View style={[styles.btnVolUp,    { height: frameH * 0.08, top: frameH * 0.20 }]} />
        <View style={[styles.btnVolDown,  { height: frameH * 0.08, top: frameH * 0.30 }]} />
        <View style={[styles.btnPower,    { height: frameH * 0.11, top: frameH * 0.24 }]} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <WatchlistProvider>
        <RootNavigator />
      </WatchlistProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneBody: {
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.75,
    shadowRadius: 44,
  },
  screen: {
    backgroundColor: '#171121',
    borderRadius: 54,
    overflow: 'hidden',
  },
  dynamicIsland: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    height: 34,
    backgroundColor: '#000000',
    borderRadius: 17,
    zIndex: 10,
  },
  btnMute: {
    position: 'absolute',
    left: -5,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#2C2C2E',
  },
  btnVolUp: {
    position: 'absolute',
    left: -5,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#2C2C2E',
  },
  btnVolDown: {
    position: 'absolute',
    left: -5,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#2C2C2E',
  },
  btnPower: {
    position: 'absolute',
    right: -5,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#2C2C2E',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { ProfileStack } from './ProfileStrack';
import { SearchStack } from './SearchStack';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const routes = state?.routes ?? [];

  return (
    <View style={styles.tabBar}>
      {routes.map((route, index) => {
        const descriptor = descriptors?.[route.key];
        const options = descriptor?.options ?? {};
        const focused = state?.index === index;
        const color = focused ? '#0296E5' : '#67686D';
        const icon = options.tabBarIcon?.({ focused, color, size: 22 });
        const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name as never);
              }
            }}
          >
            {icon}
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export const MainTap = createBottomTabNavigator({
  // @ts-ignore
  tabBar: (props: BottomTabBarProps) => <CustomTabBar {...props} />,
  screenOptions: {
    headerShown: false,
  },
  screens: {
    HomeStack: {
      screen: HomeStack,
      options: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      },
    },
    SearchStack: {
      screen: SearchStack,
      options: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Feather name="search" size={size} color={color} />
        ),
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      options: {
        tabBarLabel: 'Watch list',
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Feather name="bookmark" size={size} color={color} />
        ),
      },
    },
  },
});

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#171121',
    borderTopColor: '#252836',
    borderTopWidth: 1,
    height: 62,
    paddingTop: 6,
    paddingBottom: 14,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
});

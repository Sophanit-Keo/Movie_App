import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

function getTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function SignalBars() {
  return (
    <View style={styles.signal}>
      {[5, 8, 11, 14].map((h, i) => (
        <View key={i} style={[styles.bar, { height: h, marginLeft: i > 0 ? 2 : 0 }]} />
      ))}
    </View>
  );
}

export default function MockStatusBar() {
  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.right}>
        <SignalBars />
        <Feather name="wifi" size={14} color="#FFFFFF" style={{ marginLeft: 6 }} />
        <View style={styles.batteryWrap}>
          <View style={styles.batteryBody}>
            <View style={styles.batteryFill} />
          </View>
          <View style={styles.batteryTip} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#171121',
  },
  time: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signal: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bar: {
    width: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  batteryWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  batteryBody: {
    width: 22,
    height: 11,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 3,
    padding: 1.5,
    justifyContent: 'center',
  },
  batteryFill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  batteryTip: {
    width: 2.5,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    marginLeft: 1,
  },
});

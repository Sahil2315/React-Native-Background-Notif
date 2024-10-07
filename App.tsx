import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import notifee, { AndroidVisibility, AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';

export default function App() {
  let [hours, setHours] = useState<number>(0)
  let [minutes, setMins] = useState<number>(0)
  async function onCreateTriggerNotification() {
    await notifee.requestPermission()
    const channelId = await notifee.createChannel({
      id: 'Aylo Aylo',
      name: 'ChannelX',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      vibration: true,
    });
    let dateStamp = new Date()
    dateStamp.setHours(hours)
    dateStamp.setMinutes(minutes)
    dateStamp.setSeconds(0)
    alert(`${dateStamp.getFullYear()} - ${dateStamp.getMonth() + 1} - ${dateStamp.getDate()} -- ${dateStamp.getHours()}:${dateStamp.getMinutes()} will be the time of notification detonation`)
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: dateStamp.getTime(),
      alarmManager: {
        allowWhileIdle: true
      }
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id: '12142',
        title: 'Testing Timed Specific Time',
        body: 'On Time',
        android: {
          channelId,
          importance: AndroidImportance.HIGH
        },
      },
      trigger,
    );
  }

  return (
    <View>
      <TextInput keyboardType='numeric' onChangeText={(value) => {setHours(parseInt(value))}} placeholder='Time in Hours' />
      <TextInput keyboardType='numeric' onChangeText={(value) => {setMins(parseInt(value))}} placeholder='Time in Minutes'/>
      <Button title="Date - Timed Notif" onPress={() => onCreateTriggerNotification()} />
    </View>
  );
}
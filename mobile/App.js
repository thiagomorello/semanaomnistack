import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#e30134" />
    <Routes />
    </>
);
}

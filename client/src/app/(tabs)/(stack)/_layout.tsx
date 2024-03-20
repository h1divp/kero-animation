import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
export default function StackLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="world" />
        </Stack>
    )
}

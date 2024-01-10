import { Link, Stack } from 'expo-router';
export default function StackLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="world" />
        </Stack>
    )
}

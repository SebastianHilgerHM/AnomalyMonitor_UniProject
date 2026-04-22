import { Stack } from 'expo-router';
import { AnomalyProvider } from '../context/anomalyprovider';

export default function RootLayout() {
    return (
        <AnomalyProvider>   
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            </Stack>
        </AnomalyProvider>
    )
}
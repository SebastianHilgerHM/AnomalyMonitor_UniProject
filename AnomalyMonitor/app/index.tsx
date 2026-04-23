import { Redirect } from 'expo-router';

export default function AppIndex() {
  // Keep root route simple by forwarding directly to the main tab entry.
  return <Redirect href="/(tabs)/home" />;
}

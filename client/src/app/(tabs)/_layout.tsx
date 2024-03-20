import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, StatusBar } from 'react-native';

import Colors from '../../constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
        <StatusBar barStyle='dark-content' backgroundColor="#fff" />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#fff',
                elevation: 0,
                borderTopWidth: 0
            },
          }}>
          <Tabs.Screen
            name="(stack)"
            options={{
              title: 'world',
              tabBarIcon: ({ color }) => <TabBarIcon name="globe" color={color} />,
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: 'create',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
          />
          <Tabs.Screen
            name="saved"
            options={{
              title: 'saved',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'You',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
          />
        </Tabs>
    </>
  );
}

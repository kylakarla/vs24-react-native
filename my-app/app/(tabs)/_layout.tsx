import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4F63AC",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarStyle: { backgroundColor: "#fff", borderTopWidth: 0 },
      }}
    >
<Tabs.Screen
  name="index"
  options={{
    title: "Home",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="favorites"
  options={{
    title: "Favorites",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="heart-outline" size={size} color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="profile"
  options={{
    title: "Profile",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="person-outline" size={size} color={color} />
    ),
  }}
/>
    </Tabs>
  );
}
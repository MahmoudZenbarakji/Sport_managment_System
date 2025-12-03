import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native"; // <-- Text added here
import { useAuth } from "../context/AuthContext";

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#E9622b" />
      </View>
    );
  }

  if (!user) {
    return null; // or a loading screen
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E9622b",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "#000000",
          elevation: 0,
          padding: 0,
          margin: 0,
        },
        headerTitleStyle: {
          color: "#ffff",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/img/logo.png")}
                style={{
                  width: 55,
                  height: 55,
                  marginRight: 8,
                  borderRadius: 8,
                }}
                resizeMode="contain"
              />
              <Image
                source={require("../../assets/img/text.png")}
                style={{
                  width: 150,
                  height: 80,
                  marginRight: 8,
                  borderRadius: 8,
                }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Facilities"
        options={{
          headerShown: true,
          headerTitle: "Facilities",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="stadium" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

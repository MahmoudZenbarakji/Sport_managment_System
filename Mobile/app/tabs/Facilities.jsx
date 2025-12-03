import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function FacilitiesPage() {
  const router = useRouter();

  const facilities = [
    {
      id: "1",
      image: require("../../assets/img/facility1.jpg"),
      location: "Fares‑Al Sham",
    },
    {
      id: "2",
      image: require("../../assets/img/facility2.jpg"),
      location: "AL Majd SC",
    },
    {
      id: "3",
      image: require("../../assets/img/facility3.jpg"),
      location: "Al Nidal SC",
    },
  ];

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.page}>
        {facilities.map((f) => (
          <View key={f.id} style={styles.card}>
            <Image source={f.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#fff"
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>{f.location}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push(`/facilities/${f.id}`)}
            >
              <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#111",
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  locationIcon: {
    marginRight: 6,
  },
  locationText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#E9622b",
    paddingVertical: 12,
    margin: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

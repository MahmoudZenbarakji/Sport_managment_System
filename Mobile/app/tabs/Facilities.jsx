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
              <Ionicons name="arrow-forward" size={20} color="#fff" />
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
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1a1a1a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0a0a0a",
  },
  locationIcon: {
    marginRight: 8,
    color: "#E9622b",
  },
  locationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#E9622b",
    paddingVertical: 14,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#E9622b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

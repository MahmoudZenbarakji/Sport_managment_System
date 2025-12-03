import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
import { API_BASE, ENDPOINTS } from "../app/api/api";
import { useRouter } from "expo-router";

// Helper to build full image URL for coach profile pictures
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${API_BASE}${imagePath}`;
};

const CoachesSection = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await axios.get(`${ENDPOINTS.Coaches}?page=1&limit=10`);
        const data = res.data?.data || [];
        setCoaches(data);
      } catch (err) {
        console.log("Error fetching coaches:", err?.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  if (!coaches.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Coaches</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {coaches.map((coach) => (
          <View key={coach._id} style={styles.cardWrapper}>
            <View style={styles.avatarWrapper}>
              {coach.profilePicture ? (
                <Image
                  source={{ uri: getImageUrl(coach.profilePicture) }}
                  style={styles.avatar}
                />
              ) : (
                <Text style={styles.avatarFallback}>
                  {coach.name?.[0]?.toUpperCase() || "C"}
                </Text>
              )}
            </View>
            <Text
              numberOfLines={1}
              style={styles.nameText}
              onPress={() => router.push(`/coach/${coach._id}`)}
            >
              {coach.name}
            </Text>
            {coach.city ? (
              <Text numberOfLines={1} style={styles.cityText}>
                {coach.city}
              </Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const AVATAR_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  loadingContainer: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#E9622b",
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  cardWrapper: {
    width: AVATAR_SIZE + 30,
    marginRight: 12,
    alignItems: "center",
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#E53E3E",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarFallback: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  nameText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
  cityText: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
});

export default CoachesSection;



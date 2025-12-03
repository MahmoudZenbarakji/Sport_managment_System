// Components/SportsCategory.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { ENDPOINTS, API_BASE } from "../app/api/api";

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // If it's a relative path, prepend API_BASE
  return `${API_BASE}${imagePath}`;
};

const SportsCategory = ({ onPressSport }) => {
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await axios.get(ENDPOINTS.Category);
        const data = res.data;
        if (!Array.isArray(data)) {
          console.warn("Expected an array from /category, got:", data);
          setSportsData([]);
          return;
        }
        const formatted = data.map(item => ({
          id: item._id,
          name: item.name,
          image: item.image, // URL
        }));
        setSportsData(formatted);
      } catch (err) {
        console.log("Error fetching categories:", err?.message || err);
      } finally {
        setLoading(false);
      }
    };
    fetchSports();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sports Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {sportsData.map(sport => (
          <TouchableOpacity
            key={sport.id}
            style={styles.cardWrapper}
            activeOpacity={0.8}
            onPress={() => onPressSport(sport)}
          >
            <View style={styles.circle}>
              {sport.image ? (
                <Image
                  source={{ uri: getImageUrl(sport.image) }}
                  style={styles.circleImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.fallbackText}>
                  {sport.name[0]?.toUpperCase()}
                </Text>
              )}
            </View>
            <Text style={styles.labelText} numberOfLines={1}>
              {sport.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const SIZE = 80; // circle diameter

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor:"#000000"
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
    width: SIZE,
    marginRight: 12,
    alignItems: "center",
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "#E53E3E", // fallback background if image fails
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  circleImage: {
    width: SIZE,
    height: SIZE,
  },
  fallbackText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  labelText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
    width: SIZE + 10,
  },
});

export default SportsCategory;

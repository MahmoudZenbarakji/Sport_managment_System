import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { ENDPOINTS, API_BASE } from "../api/api";

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // If it's a relative path, prepend API_BASE
  return `${API_BASE}${imagePath}`;
};

export default function CategoryDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${ENDPOINTS.Category}/${id}`);
        setCategory(res.data);
      } catch (err) {
        console.log("Error fetching category:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E9622b" />
      </View>
    );
  }

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Category not found</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Get stadiums from populated category data
  const stadiums = category?.stadiums || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {category.image && (
          <Image source={{ uri: getImageUrl(category.image) }} style={styles.categoryImage} />
        )}
        <Text style={styles.categoryName}>{category.name}</Text>
        {category.description && (
          <Text style={styles.categoryDescription}>{category.description}</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Related Stadiums</Text>
      {stadiums.length > 0 ? (
        stadiums.map((stadium) => (
          <TouchableOpacity
            key={stadium._id}
            style={styles.gymCard}
            onPress={() => router.push(`/gyms/${stadium._id}`)}
          >
            {stadium.Image && (
              <Image source={{ uri: getImageUrl(stadium.Image) }} style={styles.stadiumImage} />
            )}
            <Text style={styles.gymName}>{stadium.name}</Text>
            <Text style={styles.gymDesc}>{stadium.description}</Text>
            {stadium.Price && (
              <Text style={styles.priceText}>Price: ${stadium.Price}</Text>
            )}
            {stadium.owner && (
              <Text style={styles.ownerText}>Owner: {stadium.owner.name || stadium.owner.email}</Text>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noStadiumsText}>No stadiums available for this category</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  categoryImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  categoryDescription: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E9622b",
    marginBottom: 10,
  },
  gymCard: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  stadiumImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  gymName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  gymDesc: {
    fontSize: 14,
    color: "#ccc",
  },
  button: {
    backgroundColor: "#E9622b",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  priceText: {
    fontSize: 16,
    color: "#E9622b",
    fontWeight: "bold",
    marginTop: 4,
  },
  ownerText: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  noStadiumsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
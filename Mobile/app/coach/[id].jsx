import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { API_BASE } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function CoachDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user, token } = useAuth();

  const [coach, setCoach] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get coach details
        const coachRes = await axios.get(`${API_BASE}/api/v1/users/${id}`);
        setCoach(coachRes.data);

        // Get all sessions and filter by coach
        const sessionsRes = await axios.get(`${API_BASE}/api/v1/sessions`);
        const allSessions = sessionsRes.data || [];
        const coachSessions = allSessions.filter(
          (s) => s.coach && (s.coach._id === id || s.coach === id)
        );
        setSessions(coachSessions);
      } catch (err) {
        console.log("Error loading coach details:", err?.message || err);
        Alert.alert("Error", "Failed to load coach details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleApply = async (sessionId) => {
    if (!user || !token) {
      Alert.alert("Login Required", "Please login to register for a session");
      router.push("/login");
      return;
    }

    try {
      setApplyingId(sessionId);
      await axios.post(
        `${API_BASE}/api/v1/sessions/${sessionId}/apply`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Success", "Registered to training session successfully");
    } catch (err) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to register for session"
      );
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E9622b" />
        <Text style={styles.loadingText}>Loading coach...</Text>
      </View>
    );
  }

  if (!coach) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Coach not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.coachName}>{coach.name}</Text>
      {coach.bio ? <Text style={styles.coachBio}>{coach.bio}</Text> : null}
      {coach.city ? <Text style={styles.coachCity}>{coach.city}</Text> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Training Sessions</Text>
        {sessions.length ? (
          sessions.map((s) => (
            <View key={s._id} style={styles.sessionCard}>
              <Text style={styles.sessionTitle}>{s.title}</Text>
              <Text style={styles.sessionMeta}>
                {s.date ? new Date(s.date).toLocaleString() : ""}
              </Text>
              {s.location ? (
                <Text style={styles.sessionMeta}>Location: {s.location}</Text>
              ) : null}
              {typeof s.price === "number" ? (
                <Text style={styles.sessionMeta}>Price: ${s.price}</Text>
              ) : null}
              {s.description ? (
                <Text style={styles.sessionDescription}>{s.description}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => handleApply(s._id)}
                disabled={applyingId === s._id}
              >
                <Text style={styles.applyButtonText}>
                  {applyingId === s._id ? "Registering..." : "Register"}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noSessionsText}>
            This coach has no active training sessions yet.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
  },
  coachName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  coachBio: {
    color: "#ccc",
    marginBottom: 4,
  },
  coachCity: {
    color: "#aaa",
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    color: "#E9622b",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  sessionCard: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  sessionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sessionMeta: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 2,
  },
  sessionDescription: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: "#E9622b",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 4,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noSessionsText: {
    color: "#999",
  },
});



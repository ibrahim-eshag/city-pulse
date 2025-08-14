import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "@/app/redux";
import { LocalEventActions } from "@/app/redux/actions/event/EventActions";

export default function EventDetailsScreen() {
  const { eventId } = useLocalSearchParams();
  const dispatch = useDispatch<any>();
  const event = useSelector((state: AppState) =>
    state.localEvents.localEvents.find((e) => e.id === eventId)
  );
  const favorites = useSelector(
    (state: AppState) => state.localEvents.favorites || []
  );
  const isFavorite = favorites.some((fav: any) => fav.id === eventId);

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text>Event not found.</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    let updated;
    if (isFavorite) {
      updated = favorites.filter((f) => f.id !== eventId);
    } else {
      updated = [...favorites, event];
    }
    dispatch(LocalEventActions.updateFavorites(updated));
  };

  // Get main image
  const mainImage =
    event.images && event.images.length > 0 ? event.images[0].url : undefined;
  // Get date
  const date =
    event.dates?.start?.localDate || event.dates?.start?.dateTime || "";
  // Get venue (from _embedded if available)
  const venue = event._embedded?.venues?.[0]?.name || "";
  // Get description/info
  const description = event.info || event.pleaseNote || "";

  return (
    <ScrollView style={styles.container}>
      {mainImage && <Image source={{ uri: mainImage }} style={styles.image} />}
      <View style={styles.infoBox}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.venue}>{venue}</Text>
        <Text style={styles.desc}>{description}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favBtn}>
          <Text style={styles.favText}>
            {isFavorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  infoBox: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  venue: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: "#333",
    marginBottom: 16,
  },
  favBtn: {
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  favText: {
    fontSize: 18,
    color: "#333",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
});

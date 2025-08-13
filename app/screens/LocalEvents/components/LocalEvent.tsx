import { LocalEvent } from "@/app/models/event/Event";
import React from "react";
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  event: LocalEvent;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress: () => void;
  language: "en" | "ar";
}

export const LocalEventComponent: React.FC<Props> = ({
  event,
  isFavorite,
  onToggleFavorite,
  onPress,
  language,
}) => {
  const mainImage = event.images?.[0]?.url;
  const eventDate = event.dates?.start?.localDate;
  const eventTime = event.dates?.start?.localTime;
  const venue = event._embedded?.venues?.[0]?.name;

  return (
    <TouchableOpacity
      style={[styles.card, I18nManager.isRTL && styles.rtl]}
      onPress={onPress}
    >
      {mainImage && (
        <Image
          source={{ uri: mainImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {event.name}
        </Text>
        <Text style={styles.details}>
          {eventDate} {eventTime} {venue ? `• ${venue}` : ""}
        </Text>
        <TouchableOpacity
          onPress={() => onToggleFavorite(event.id)}
          style={styles.favorite}
        >
          <Text style={{ fontSize: 20 }}>{isFavorite ? "★" : "☆"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  rtl: {
    flexDirection: "row-reverse",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    maxWidth: "85%",
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  favorite: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 8,
  },
});

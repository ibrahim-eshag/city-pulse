import { useRouter } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Locale } from "@/app/locale";
import { LocalEvent } from "@/app/models/event/Event";
import { AppState } from "@/app/redux";
import { LocalEventActions } from "@/app/redux/actions/event/EventActions";
import { LocalEventComponent } from "../LocalEvents/components/LocalEvent";

export default function FavoriteEventsScreen() {
  const dispatch = useDispatch<any>();
  const favorites = useSelector(
    (state: AppState) => state.localEvents?.favorites || []
  );
  const router = useRouter();
  const lang = Locale.currentLocale;

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((event: LocalEvent) => event.id !== id);
    dispatch(LocalEventActions.updateFavorites(updated));
  };

  return (
    <View style={[styles.container]}>
      <SafeAreaView>
        <Text style={styles.title}>{Locale.strings("favorites")}</Text>
        {favorites.length === 0 && (
          <Text style={styles.emptyMessage}>
            {Locale.strings("no_favorites")}
          </Text>
        )}
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => (item.id ? item.id : String(index))}
          renderItem={({ item }) => (
            <LocalEventComponent
              event={item}
              isFavorite={true}
              onToggleFavorite={() => removeFavorite(item.id)}
              onPress={() => {
                router.push({
                  pathname: "/LocalEvents/[eventId]",
                  params: { eventId: item.id },
                });
              }}
              language={lang}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  input: {
    flex: 2,
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "flex-start",
  },
  langBtn: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginLeft: 8,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginVertical: 20,
  },
});

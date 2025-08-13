import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Locale } from "@/app/locale";
import { AppState } from "@/app/redux";
import { ConfigActions } from "@/app/redux/actions/config/ConfigActions";
import { LocalEventActions } from "@/app/redux/actions/event/EventActions";
import { Storage } from "@/app/services/storage/storage";
import { CityPicker } from "./components/CityPicker";
import { LocalEventComponent } from "./components/LocalEvent";

export default function LocalEventsScreen() {
  const dispatch = useDispatch<any>();
  const events = useSelector(
    (state: AppState) => state.localEvents?.localEvents || []
  );
  const loading = useSelector(
    (state: AppState) => state.localEvents?.loading || false
  );
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedDmaid, setSelectedDmaid] = useState<string>("");
  const favorites = useSelector(
    (state: AppState) => state.localEvents?.favorites || []
  );
  const lang = Locale.currentLocale;

  const [language, setLanguage] = useState<"en" | "ar">(lang);

  // Helper to get city name from dmaid (assuming cities.json is available)
  const getCityName = (dmaid: string) => {
    if (!dmaid) return "";
    try {
      const cities = require("@/data/cities.json");
      const city = cities.find((c: any) => c.id === dmaid);
      return city ? city.name : "";
    } catch {
      return "";
    }
  };

  // Fetch events: reset on new search/city/language, append on scroll
  const fetchEvents = useCallback(
    (reset = false) => {
      const params = {
        cityName: getCityName(selectedDmaid),
        keyword: search,
        page: reset ? 0 : page,
        pageSize: 10,
      };
      dispatch(LocalEventActions.listAllEvents(params));
      if (reset) setPage(0);
    },
    [dispatch, selectedDmaid, search, page]
  );

  // Reset events on new search/city/language
  useEffect(() => {
    fetchEvents(true);
  }, [search, selectedDmaid, language]);

  // Append events on scroll
  const loadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      dispatch(
        LocalEventActions.listAllEvents({
          cityName: getCityName(selectedDmaid),
          keyword: search,
          page: nextPage,
          pageSize: 10,
        })
      );
      setPage(nextPage);
    }
  };

  const toggleFavorite = async (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }
    await dispatch(LocalEventActions.updateFavorites(updated));
  };
  // Load favorites from storage on mount
  useEffect(() => {
    (async () => {
      const stored = await new Storage().get("favorites");
      if (Array.isArray(stored)) {
        dispatch(LocalEventActions.updateFavorites(stored));
      }
    })();
  }, [dispatch]);

  const switchLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    dispatch(ConfigActions.setLanguage(newLang));
    setLanguage(newLang);
  };

  const handleSelectedCity = (dmaid: string) => {
    setSelectedDmaid(dmaid);
  };
  return (
    <View style={[styles.container]}>
      <SafeAreaView>
        <Text style={styles.title}>City Pulse</Text>
        <View
          style={[
            styles.header,
            language === "ar" && { flexDirection: "row-reverse" },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder={language === "en" ? "Search events" : "بحث"}
            value={search}
            onChangeText={setSearch}
          />
          <CityPicker
            selectedDmaid={selectedDmaid}
            onSelect={handleSelectedCity}
            language={language}
          />
          <TouchableOpacity onPress={switchLanguage} style={styles.langBtn}>
            <Text>{language === "en" ? "AR" : "EN"}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LocalEventComponent
              event={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={toggleFavorite}
              onPress={() => {
                router.push({
                  pathname: "/LocalEvents/[eventId]",
                  params: { eventId: item.id },
                });
              }}
              language={language}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
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
  },
  langBtn: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginLeft: 8,
  },
});

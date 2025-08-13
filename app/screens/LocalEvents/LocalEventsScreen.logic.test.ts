// @ts-ignore
import { LocalEvent } from "@/app/models/event/Event";

function toggleFavorite(
  favorites: LocalEvent[],
  events: LocalEvent[],
  id: string
): LocalEvent[] {
  const eventObj = events.find((e) => e.id === id);
  if (!eventObj) return favorites;
  if (favorites.some((f) => f.id === id)) {
    return favorites.filter((f) => f.id !== id);
  } else {
    return [...favorites, eventObj];
  }
}

describe("toggleFavorite", () => {
  const events: LocalEvent[] = [
    { id: "1", name: "Event 1", type: "music", url: "", locale: "en" },
    { id: "2", name: "Event 2", type: "art", url: "", locale: "en" },
  ];

  it("adds a new favorite", () => {
    const favorites: LocalEvent[] = [];
    const result = toggleFavorite(favorites, events, "1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("removes an existing favorite", () => {
    const favorites: LocalEvent[] = [events[0]];
    const result = toggleFavorite(favorites, events, "1");
    expect(result).toHaveLength(0);
  });

  it("does nothing if event not found", () => {
    const favorites: LocalEvent[] = [];
    const result = toggleFavorite(favorites, events, "3");
    expect(result).toHaveLength(0);
  });

  it("adds multiple favorites", () => {
    let favorites: LocalEvent[] = [];
    favorites = toggleFavorite(favorites, events, "1");
    favorites = toggleFavorite(favorites, events, "2");
    expect(favorites).toHaveLength(2);
    expect(favorites.map((f) => f.id)).toEqual(["1", "2"]);
  });

  it("removes only the selected favorite", () => {
    let favorites: LocalEvent[] = [events[0], events[1]];
    favorites = toggleFavorite(favorites, events, "1");
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toBe("2");
  });
});

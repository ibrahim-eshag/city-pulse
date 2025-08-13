import cities from "@/data/cities.json";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  selectedDmaid: string;
  onSelect: (dmaid: string) => void;
  language: "en" | "ar";
}

export const CityPicker: React.FC<Props> = ({
  selectedDmaid,
  onSelect,
  language,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedCity = cities.find((city) => city.id === selectedDmaid);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.label}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.labelText} numberOfLines={1}>
          {selectedCity
            ? selectedCity.name
            : language === "en"
            ? "Select City"
            : "اختر مدينة"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedDmaid}
              onValueChange={(value) => {
                onSelect(value);
                setModalVisible(false);
              }}
              style={styles.picker}
            >
              {cities.map((city) => (
                <Picker.Item key={city.id} label={city.name} value={city.id} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeBtn}
            >
              <Text style={styles.closeText}>
                {language === "en" ? "Close" : "إغلاق"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "center",
  },
  label: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    paddingHorizontal: 12,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "80%",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: 180,
  },
  closeBtn: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  closeText: {
    fontSize: 16,
    color: "#333",
  },
});

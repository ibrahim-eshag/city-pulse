import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {fonts} from "@/assets/fonts";
import {useTheme} from "@react-navigation/native";

interface DateOfBirthPickerProps {
    date: Date;
    onDateChange: (date: Date) => void;
    placeholder?: string; // Placeholder text (optional)
}

const DateOfBirthPicker: React.FC<DateOfBirthPickerProps> = ({
                                                                 date,
                                                                 onDateChange,
                                                                 placeholder = "Select Date",
                                                             }) => {
    const [showPicker, setShowPicker] = useState(false);
    const {colors} = useTheme();
    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false); // Always close the picker
        if (selectedDate) {
            onDateChange(selectedDate); // Update the parent state with the selected date
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.inputs}]}>
            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={styles.datePickerButton}
            >
                <Text style={[styles.dateText, {color: colors.text}]}>
                    {date ? date.toLocaleDateString() : placeholder}
                </Text>
            </TouchableOpacity>

            {showPicker && Platform.OS === "ios" && (
                <Modal
                    visible={showPicker}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowPicker(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <DateTimePicker
                                mode="date"
                                value={date || new Date()}
                                onChange={handleDateChange}
                                maximumDate={new Date()} // Prevent future dates
                            />
                            <TouchableOpacity
                                onPress={() => setShowPicker(false)}
                                style={styles.doneButton}
                            >
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {showPicker && Platform.OS !== "ios" && (
                <DateTimePicker
                    mode="date"
                    value={date || new Date()}
                    onChange={handleDateChange}
                    maximumDate={new Date()} // Prevent future dates
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    datePickerButton: {
        // backgroundColor: "#F0F1F4",
        borderRadius: 8,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    dateText: {
        fontSize: 16,
        color: "#333",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    doneButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#5446FF",
        marginTop: 15,
        width: 100,
        alignItems: "center",
    },
    doneButtonText: {
        color: "#FFF",
        fontFamily: fonts.bold,
    },
});

export default DateOfBirthPicker;
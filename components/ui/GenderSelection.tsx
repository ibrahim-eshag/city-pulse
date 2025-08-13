import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Locale} from "@/app/locale";
import {fonts} from "@/assets/fonts";

// Props for GenderSelection
interface GenderSelectionProps {
    selectedGender: number; // 1 for male, 2 for female
    onGenderChange: (gender: number) => void; // Callback to notify parent of gender change
}

const GenderSelection: React.FC<GenderSelectionProps> = ({
                                                             selectedGender,
                                                             onGenderChange,
                                                         }) => {
    return (
        <View style={styles.genderSelectionContainer}>
            {/* Male Selection */}
            <TouchableOpacity
                onPress={() => onGenderChange(1)}
                style={[
                    styles.genderButton,
                    selectedGender === 1 && styles.genderButtonActive,
                ]}
            >
                <Text
                    style={[
                        styles.genderText,
                        selectedGender === 1 && styles.genderTextActive,
                    ]}
                >
                    {Locale.strings("profile.male")}
                </Text>
            </TouchableOpacity>

            {/* Female Selection */}
            <TouchableOpacity
                onPress={() => onGenderChange(2)}
                style={[
                    styles.genderButton,
                    selectedGender === 2 && styles.genderButtonActive,
                ]}
            >
                <Text
                    style={[
                        styles.genderText,
                        selectedGender === 2 && styles.genderTextActive,
                    ]}
                >
                    {Locale.strings("profile.female")}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    genderSelectionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    genderButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F0F1F4",
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    genderButtonActive: {
        backgroundColor: "#5446FF",
    },
    genderText: {
        fontSize: 14,
        color: "#000",
    },
    genderTextActive: {
        color: "#FFF",
        fontFamily: fonts.bold,
    },
});

export default GenderSelection;
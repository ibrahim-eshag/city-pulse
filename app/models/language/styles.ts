import {StyleSheet} from 'react-native';
import {IColors} from '../../res/theme';
import {fonts} from "@/assets/fonts";
// import {fonts} from '../../res/fonts';

export const languagePicker = (_colors: IColors) =>
    StyleSheet.create({
        container: {
            backgroundColor: "white",
            zIndex: 10,
            opacity: 1
        },
    });

export const languageItem = (colors: IColors) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 12,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
        },
        icon: {
            fontFamily: fonts.extraBold,
            color: colors.primary,
            fontSize: 18,
            marginEnd: 12,
            marginStart: 12,
        },
        title: {
            fontFamily: fonts.light,
            fontSize: 15,
            color: colors.text,
            textAlign: 'left',
        },
    });

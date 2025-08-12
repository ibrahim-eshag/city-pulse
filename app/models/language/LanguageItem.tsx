import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {LocalizationItemType} from '../../locale/types';
import {ITheme} from '../../res/theme';
import {languageItem} from './styles';

interface LanguageItemProps {
    item: LocalizationItemType;
    onItemPress: (item: LocalizationItemType) => void;
}

const LanguageItem: React.FC<LanguageItemProps> = props => {
    const {colors} = useTheme() as ITheme;
    const styles = useMemo(() => languageItem(colors), [colors]);

    const onPress = useCallback(() => {
        props.onItemPress(props.item);
    }, [props]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.icon}>{props.item.icon.toUpperCase()}</Text>
            <Text style={[styles.title, {color: "black"}]}>{props.item.label}</Text>
        </TouchableOpacity>
    );
};

export {LanguageItem};

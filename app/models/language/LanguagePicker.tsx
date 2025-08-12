import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';

import {ConfigActions} from '@/app/redux/actions/config';
import {LocalizationList} from '../../locale';
import {LocalizationItemType, LocalizationType} from '../../locale/types';
import {ITheme} from '../../res/theme';
import {AppState} from '@/app/redux';
import {LanguageItem} from './LanguageItem';
import {languagePicker} from './styles';

interface LanguagePickerProps {
    onLanguagesChanged?: () => void;

    setLanguage: (language: LocalizationType) => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = props => {
    const {colors} = useTheme() as ITheme;
    const styles = useMemo(() => languagePicker(colors), [colors]);

    const onItemSelected = useCallback((item: LocalizationItemType) => {
        props.onLanguagesChanged?.();
        Alert.alert(
            'Change language',
            'Change Language Require Application Restart',
            [
                {
                    isPreferred: true,
                    style: 'default',
                    text: 'Change Language',
                    onPress: () => {
                        props.setLanguage(item.id);
                    },
                },
                {isPreferred: false, style: 'cancel', text: 'Cancel'},
            ],
        );
    }, []);

    return (
        <View style={[styles.container]}>
            {Object.values(LocalizationList).map(item => {
                return (
                    <LanguageItem
                        key={item.id}
                        item={item}
                        onItemPress={onItemSelected}
                    />
                );
            })}
        </View>
    );
};

const mapStateToProps = (_state: AppState) => ({});

const mapDispatchToProps = {
    setLanguage: ConfigActions.setLanguage,
};

const con = connect(mapStateToProps, mapDispatchToProps)(LanguagePicker);

export {con as LanguagePicker};

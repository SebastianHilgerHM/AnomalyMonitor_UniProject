import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontsize } from '../constants/theme';

type Props = {
    title: string;
};

export default function SubTitle({ title }: Props) {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: colors.textaccent,
        fontSize: fontsize.h2,
        fontWeight: '200',
        //marginBottom: spacing.sm,
    },
});
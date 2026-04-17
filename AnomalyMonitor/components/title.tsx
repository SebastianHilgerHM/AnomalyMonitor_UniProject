import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontsize } from '../constants/theme';

type Props = {
    title: string;
};

export default function Title({ title }: Props) {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: colors.textprimary,
        fontSize: fontsize.h1,
        fontWeight: '700',
        marginBottom: spacing.sm,
    },
});
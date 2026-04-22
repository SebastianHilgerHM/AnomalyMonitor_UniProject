import { View, Text, StyleSheet } from 'react-native';
import { colors, fontsize, radius, spacing } from '../constants/theme';

type Props = {
    label: string;
};

export default function Button({ label }:Props ) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.ctaaccent,
        borderRadius: radius.md,
        width: '100%',
    },
    text: {
        padding: spacing.md,
        color: colors.bg,
        fontSize: fontsize.b1,
        fontWeight: '700',
        textAlign: 'center',
    },
});
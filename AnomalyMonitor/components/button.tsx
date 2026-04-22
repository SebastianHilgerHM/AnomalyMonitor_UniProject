import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors, fontsize, radius, spacing } from '../constants/theme';

type Props = {
    label: string;
    onPress?: () => void;
};

export default function Button({ label, onPress }:Props ) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
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
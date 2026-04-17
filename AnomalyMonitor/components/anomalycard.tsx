import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontsize } from '../constants/theme';

type Props = {
    title: string;
    description: string;
};

export default function AnomalyCard({ title, description }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: radius.md,
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    title: {
        color: colors.textprimary,
        fontSize: fontsize.h2,
        fontWeight: '700',
        marginBottom: spacing.sm,
    },
    desc: {
        color: colors.textsecondary,
        fontSize: fontsize.b1,
    },
});
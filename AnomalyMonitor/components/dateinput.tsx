import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontsize } from '../constants/theme';

type Props = {
    label: string;
    placeholder: string;
};

export default function DateInput({ label, placeholder }:Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.date}>{placeholder}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    label: {
        color: colors.textsecondary,
        fontSize: fontsize.b3,
        fontWeight: '400',
    },
    date: {
        backgroundColor: colors.card,
        marginTop: spacing.sm,
        padding: spacing.md,
        color: colors.textprimary,
        fontSize: fontsize.b2,
        fontWeight: '500',
        borderRadius: spacing.md,
    },
}); 
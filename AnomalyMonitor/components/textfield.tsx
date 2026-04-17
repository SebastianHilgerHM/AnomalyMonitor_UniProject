import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontsize } from '../constants/theme';

type Props = {
    text: string;
};

export default function TextField({ text }: Props) {
    return (
        <View>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: colors.textsecondary,
        fontSize: fontsize.b1,
        fontWeight: '400',
        marginBottom: spacing.sm,
    },
});
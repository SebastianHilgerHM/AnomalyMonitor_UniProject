import { View, Text, Image, StyleSheet, ImageSourcePropType, useWindowDimensions } from 'react-native';
import { colors, spacing, radius, fontsize } from '../constants/theme';

type Props = {
    label: string;
    source: ImageSourcePropType;
};

export default function AppImageInput({ label, source}: Props) {
    const { height } = useWindowDimensions();
    const imageHeight = height * 0.30;

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <Image source={source} style={[styles.image, { height: imageHeight}]} resizeMode="cover" />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.md,
    },
    label: {
        color: colors.textaccent,
        fontSize: fontsize.b1,
        fontWeight: '300',
        marginBottom: spacing.sm,
    },
    image: {
        width: '100%',
        borderRadius: radius.md,
        backgroundColor: colors.card,
    },
});
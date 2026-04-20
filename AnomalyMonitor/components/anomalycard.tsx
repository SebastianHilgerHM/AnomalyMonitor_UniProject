import { View, Text, Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontsize } from '../constants/theme';

type Props = {
    title: string;
    description: string;
    source: ImageSourcePropType;
    alt?: string; 
    style?: StyleProp<ImageStyle>;
    timestamp: string;
};

export default function AnomalyCard({ title, description, source, alt, style, timestamp }: Props) {
    return (
        <View style={styles.card}>
            <Image source={source} accessibilityLabel={alt} style={[styles.image, style]} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{description}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: radius.md,
        paddingBottom: spacing.md,
        marginBottom: spacing.md,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
        borderTopRightRadius: radius.md,
        borderTopLeftRadius: radius.md,
        marginBottom: spacing.sm,
    },
    title: {
        color: colors.textprimary,
        fontSize: fontsize.h2,
        fontWeight: '700',
        paddingLeft: spacing.lg,
        paddingRight: spacing.lg,
    },
    desc: {
        color: colors.textsecondary,
        fontSize: fontsize.b2,
        fontWeight: '300',
        marginBottom: spacing.sm,
        paddingLeft: spacing.lg,
        paddingRight: spacing.lg,
    },
    timestamp: {
        color: colors.textsecondary,
        fontSize: fontsize.b3,
        fontWeight: '400',
        paddingLeft: spacing.lg,
        paddingRight: spacing.lg,
    },
});
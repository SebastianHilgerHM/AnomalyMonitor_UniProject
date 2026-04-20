import { View, Text, Image, StyleSheet, ImageSourcePropType, ImageStyle, StyleProp,} from 'react-native';
import { colors, spacing, fontsize, radius } from '../constants/theme';

type Props = {
    title: string;
    date: string;
    desc: string;
    source: ImageSourcePropType;
    alt?: string; 
    style?: StyleProp<ImageStyle>;
};

export default function SearchCard({title, date, desc, source, alt, style}:Props) {
    return (
        <View style={styles.container}>
            <Image source={source} accessibilityLabel={alt} style={[styles.image, style]} />
            <View style={styles.textwrap}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
                <Text style={styles.desc} numberOfLines={3} ellipsizeMode="tail">{desc}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: spacing.md,
        backgroundColor: colors.card,
        width: '100%',
        height: 120,
        marginTop: spacing.md,
        flexDirection: 'row',
        gap: spacing.sm,
    },
    textwrap: {
        flex: 1,
        marginRight: spacing.sm,
    },
    image: {
        height: '100%',
        width: '30%',
        borderTopLeftRadius: radius.md,
        borderBottomLeftRadius: radius.md,
    },
    date: {
        color: colors.textsecondary,
        fontSize: fontsize.b4,
        fontWeight: '300',
        paddingTop: spacing.sm,
    },
    title: {
        color: colors.textprimary,
        fontSize: fontsize.b3,
        fontWeight: '500',
    },
    desc: {
        color: colors.textsecondary,
        fontSize: fontsize.b3,
        fontWeight: '400',
        paddingBottom: spacing.sm,
    },
});
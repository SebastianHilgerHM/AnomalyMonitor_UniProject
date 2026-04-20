import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { radius, spacing } from '../constants/theme';


type Props = {
    source: ImageSourcePropType;
    alt?: string; 
    style?: StyleProp<ImageStyle>;
};

export default function Img({ source, alt, style }: Props) {
    return <Image source={source} accessibilityLabel={alt} style={[styles.image, style]} />;
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '33%',
        borderRadius: radius.md,
        marginBottom: spacing.xl,
    },
});
import { View, Text, Image, StyleSheet, ImageSourcePropType, useWindowDimensions, Pressable } from 'react-native';
import { colors, spacing, radius, fontsize } from '../constants/theme';
import * as ImagePicker from 'expo-image-picker';

type Props = {
    label: string;
    value: string | null;
    onChangeImage: (uri: string|null) => void;
    placeholderSource?: ImageSourcePropType;
};

export default function AppImageInput({ label, value, onChangeImage, placeholderSource}: Props) {
    const { height } = useWindowDimensions();
    const imageHeight = height * 0.30;
    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.9,
        });

        if (!result.canceled && result.assets.length > 0) {
            onChangeImage(result.assets[0].uri);
        }
    };

    const source = value ? { uri: value } : placeholderSource;

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <Pressable onPress={pickImage}>
                {source ? (
                    <Image source={source} style={[styles.image, { height: imageHeight }]} resizeMode="cover" />
                ) : (
                    <View style={[styles.image, styles.blankCard, { height: imageHeight }]} />
                )}
            </Pressable>
            <Text style={styles.imageinfo}>Tap to add an image.</Text>
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
    imageinfo: {
        marginTop: spacing.xs,
        color: colors.textsecondary,
        fontSize: fontsize.b4,
    },
    image: {
        width: '100%',
        borderRadius: radius.md,
        backgroundColor: colors.card,
    },
    blankCard: {
        borderWidth: 1,
        borderColor: colors.border,
    },
});
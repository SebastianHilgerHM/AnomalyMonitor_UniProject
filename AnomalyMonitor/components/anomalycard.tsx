import { View, Text, Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Pressable, Modal } from 'react-native';
import { useState } from 'react';
import { colors, spacing, radius, fontsize } from '../constants/theme';
import SearchDetail from './searchdetail';

type Props = {
    title: string;
    description: string;
    author: string;
    source: ImageSourcePropType;
    alt?: string; 
    style?: StyleProp<ImageStyle>;
    timestamp: string;
};

export default function AnomalyCard({ title, description, author, source, alt, style, timestamp }: Props) {
    const [showPanel, setShowPanel] = useState(false);

    return (
        <>
            <Pressable onPress={() => setShowPanel(true)}>
                <View style={styles.card}>
                    <Image source={source} accessibilityLabel={alt} style={[styles.image, style]} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.author}>{author}</Text>
                    <Text style={styles.desc} numberOfLines={3} ellipsizeMode="tail">
                        {description}
                    </Text>
                    <Text style={styles.timestamp}>{timestamp}</Text>
                </View>
            </Pressable>

            <Modal
                visible={showPanel}
                animationType="slide"
                presentationStyle="fullScreen"
                onRequestClose={() => setShowPanel(false)}
            >
                <SearchDetail
                    date={timestamp}
                    source={source}
                    alt={alt}
                    style={style}
                    title={title}
                    author={author}
                    desc={description}
                    onClose={() => setShowPanel(false)}
                />
            </Modal>
        </>
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
    author: {
        color: colors.textaccent,
        fontSize: fontsize.b3,
        fontWeight: '500',
        marginBottom: spacing.xs,
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
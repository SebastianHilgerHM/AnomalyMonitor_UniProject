import { View, Text, TextInput, StyleSheet, TextInputProps, useWindowDimensions } from 'react-native';
import { radius, colors, spacing, fontsize } from '../constants/theme';

type Props = TextInputProps & {
    label: string;
};

export default function AppTextInput({ label, multiline, style, ...props }: Props) {
    const { height } = useWindowDimensions();
    const multilineHeight = height * 0.15;

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                {...props}
                multiline={multiline}
                placeholderTextColor='#6B7C93'
                style={[
                    styles.input,
                    multiline && styles.multiline,
                    multiline && { height: multilineHeight },
                    style,
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.sm,
    },
    label: {
        color: colors.textaccent,
        fontSize: fontsize.b1,
        fontWeight: '300',
        marginBottom: spacing.sm,
    },
    input: {
        backgroundColor: colors.card,
        borderRadius: radius.md,
        color: colors.textprimary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        fontSize: fontsize.b2,
        fontWeight: '200',
    },
    multiline: {
        minHeight: 96,
        textAlignVertical: 'top',
    },
});
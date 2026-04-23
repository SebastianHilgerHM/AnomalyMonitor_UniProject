import { Pressable, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, fontsize, radius, spacing } from '../constants/theme';

type Props = {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function SmallButton({ label, onPress, style }: Props) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ctaaccent,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.bg,
    fontSize: fontsize.b3,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});

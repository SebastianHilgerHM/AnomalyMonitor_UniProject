import { ScrollView, View, Text, Image, StyleSheet, ImageSourcePropType, ImageStyle, StyleProp, Pressable } from 'react-native';
import { colors, spacing, fontsize } from '../constants/theme';
import Button from './button';

type Props = {
  date: string;
  source: ImageSourcePropType;
  alt?: string;
  style?: StyleProp<ImageStyle>;
  title: string;
  author: string;
  desc: string;
  onClose: () => void;
  onSave?: () => void;
};

export default function SearchDetail({
  date,
  source,
  alt,
  style,
  title,
  author,
  desc,
  onClose,
  onSave,
}: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.date}>{date}</Text>
        <Pressable onPress={onClose}>
          <Text style={styles.closebutton}>X</Text>
        </Pressable>
      </View>

      <Pressable onPress={onClose}>
        <Image source={source} accessibilityLabel={alt} style={[styles.image, style]} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.desc}>{desc}</Text>

      {onSave && (
        <View style={styles.button}>
          <Button label="Save to My Anomalies" onPress={onSave} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    gap: spacing.sm,
  },
  button: {
    padding: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
  },
  date: {
    color: colors.textsecondary,
    fontSize: fontsize.b4,
    fontWeight: '500',
  },
  closebutton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    color: colors.textprimary,
    fontSize: fontsize.b1,
    fontWeight: '700',
    backgroundColor: colors.card,
    borderRadius: spacing.sm,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textprimary,
    fontSize: fontsize.b1,
    fontWeight: '500',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  author: {
    color: colors.textsecondary,
    fontSize: fontsize.b3,
    fontWeight: '400',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  desc: {
    color: colors.textprimary,
    fontSize: fontsize.b2,
    fontWeight: '300',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
});
import {
	Image,
	ImageSourcePropType,
	ImageStyle,
	Modal,
	Pressable,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from 'react-native';
import { useState } from 'react';
import { radius } from '../constants/theme';
import SearchDetail from './searchdetail';

type Props = {
  date: string;
  source: ImageSourcePropType;
  alt?: string;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  author: string;
  desc: string;
  onSave?: () => void;
};

export default function MapPreviewCard({
  date,
  source,
  alt,
  style,
  containerStyle,
  title,
  author,
  desc,
  onSave,
}: Props) {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <Pressable style={[styles.pressable, containerStyle]} onPress={() => setShowPanel(true)}>
        <Image source={source} accessibilityLabel={alt} style={[styles.image, style]} />
      </Pressable>

      <Modal
        visible={showPanel}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowPanel(false)}
      >
        <SearchDetail
          date={date}
          source={source}
          alt={alt}
          style={style}
          title={title}
          author={author}
          desc={desc}
          onClose={() => setShowPanel(false)}
          onSave={onSave}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
  },
});

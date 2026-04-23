import { View, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import SubTitle from '../../components/subtitle';
import Title from '../../components/title';
import SmallButton from '../../components/smallbutton';
import { colors, spacing, radius } from '../../constants/theme';

const worldMapSource = require('../../assets/images/world_map.png');
const worldMapMeta = Image.resolveAssetSource(worldMapSource);
const worldMapAspectRatio = worldMapMeta.width / worldMapMeta.height;

export default function WorldMap() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const baseMapHeight = Math.max(Math.min(height * 0.74, 560), 320);
  const mapScale = 1.15;
  const mapHeight = baseMapHeight * mapScale;
  const mapWidth = Math.max(mapHeight * worldMapAspectRatio, width * 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <SubTitle title="MAP VIEW" />
          <Title title="World Map" />
        </View>
        <SmallButton label="Back" onPress={() => router.back()} />
      </View>

      <ScrollView
        horizontal
        style={styles.mapContainer}
        contentContainerStyle={styles.mapContent}
        showsHorizontalScrollIndicator
      >
        <Image
          source={worldMapSource}
          style={[styles.mapImage, { width: mapWidth, height: mapHeight }]}
          resizeMode="contain"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: spacing.xl * 2,
    //paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.card,
    //borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapContent: {
    padding: spacing.sm,
    alignItems: 'center',
  },
  mapImage: {
    
  },
});

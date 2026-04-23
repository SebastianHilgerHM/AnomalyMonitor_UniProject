import { View, ScrollView, Image, StyleSheet, useWindowDimensions, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import SubTitle from '../../components/subtitle';
import Title from '../../components/title';
import SmallButton from '../../components/smallbutton';
import { colors, spacing, radius, fontsize } from '../../constants/theme';
import useApodMapScatter from '../../hooks/useApodMapScatter';

const worldMapSource = require('../../assets/images/world_map.png');
const worldMapMeta = Image.resolveAssetSource(worldMapSource);
const worldMapAspectRatio = worldMapMeta.width / worldMapMeta.height;

export default function WorldMap() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { loading, error, points, reload } = useApodMapScatter();

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
          <Text style={styles.metaText}>Showing latest {points.length} APOD image results</Text>
        </View>
        <View style={styles.headerButtons}>
          <SmallButton label="Reload" onPress={() => void reload()} />
          <SmallButton label="Back" onPress={() => router.back()} />
        </View>
      </View>

      <ScrollView
        horizontal
        style={styles.mapContainer}
        contentContainerStyle={styles.mapContent}
        showsHorizontalScrollIndicator
      >
        <View style={[styles.mapCanvas, { width: mapWidth, height: mapHeight }]}>
          <Image
            source={worldMapSource}
            style={[styles.mapImage, { width: mapWidth, height: mapHeight }]}
            resizeMode="contain"
          />

          {points.map((point) => (
            <View
              key={point.id}
              style={[
                styles.pin,
                {
                  left: point.xRatio * mapWidth - 5,
                  top: point.yRatio * mapHeight - 5,
                },
              ]}
            />
          ))}

          {loading && (
            <View style={styles.overlayCenter}>
              <ActivityIndicator color={colors.ctaaccent} />
              <Text style={styles.overlayText}>Loading APOD images...</Text>
            </View>
          )}

          {!loading && error && (
            <View style={styles.overlayCenter}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
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
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  metaText: {
    color: colors.textsecondary,
    fontSize: fontsize.b3,
    marginTop: spacing.xs,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapContent: {
    padding: spacing.sm,
    alignItems: 'center',
  },
  mapCanvas: {
    position: 'relative',
  },
  mapImage: {
    borderRadius: radius.sm,
  },
  pin: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.ctaaccent,
    borderWidth: 1,
    borderColor: colors.bg,
    opacity: 0.92,
  },
  overlayCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(7,11,19,0.25)',
    gap: spacing.xs,
  },
  overlayText: {
    color: colors.textprimary,
    fontSize: fontsize.b3,
  },
  errorText: {
    color: '#ef4444',
    fontSize: fontsize.b3,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});

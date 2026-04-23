import { View, ScrollView, Image, StyleSheet, useWindowDimensions, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import SubTitle from '../../components/subtitle';
import Title from '../../components/title';
import SmallButton from '../../components/smallbutton';
import MapPreviewCard from '../../components/mappreviewcard';
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
          <SmallButton label="Back" onPress={() => router.replace('/(tabs)/search')} />
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
            <MapPreviewCard
              key={point.id}
              date={point.date}
              title={point.title}
              author={point.author}
              desc={point.description}
              source={{ uri: point.imageUrl }}
              alt={point.title}
              containerStyle={[
                styles.previewPin,
                {
                  left: point.xRatio * mapWidth - 26,
                  top: point.yRatio * mapHeight - 26,
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
  previewPin: {
    position: 'absolute',
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
    color: '#000000',
    fontSize: fontsize.b3,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});

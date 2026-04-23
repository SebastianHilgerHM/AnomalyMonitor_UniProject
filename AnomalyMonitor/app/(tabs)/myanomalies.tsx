import { ScrollView, StyleSheet, Text } from 'react-native';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import { spacing, colors, fontsize } from '../../constants/theme';
import AnomalyCard from '../../components/anomalycard';
import { useAnomalies } from '../../context/anomalyprovider';

export default function MyAnomalies() {
  const { anomalies } = useAnomalies();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SubTitle title="ASSIGNED TO YOU" />
      <Title title="My Anomalies" />

      {anomalies.length === 0 ? (
        <Text style={styles.empty}>No anomalies saved yet.</Text>
      ) : (
        anomalies.map((item) => (
          <AnomalyCard
            key={item.id}
            title={item.title}
            description={item.description}
            author={item.author}
            source={
              item.imageUri
                ? {uri: item.imageUri }
                : require('../../assets/images/heroimage.jpg')
            }
            alt={item.title}
            style={{}}
            timestamp={item.timestamp}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding:spacing.md,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  empty: {
    marginTop: spacing.md,
    color:colors.textaccent,
    fontSize: fontsize.b2,
  },
});
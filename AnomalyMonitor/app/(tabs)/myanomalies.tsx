import { ScrollView, StyleSheet } from 'react-native';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import { spacing, colors } from '../../constants/theme';
import AnomalyCard from '../../components/anomalycard';

export default function MyAnomalies() {
  return (
    <ScrollView style={styles.container}>
      <SubTitle title="ASSIGNED TO YOU" />
      <Title title="My Anomalies" />
      <AnomalyCard 
        title="Mission Section 31"
        description='A very complicated mission.'
        source={require('../../assets/images/heroimage.jpg')}
        alt="Placeholder"
        style={{}}
        timestamp='26/03/2026 7:09:50 PM'
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    paddingTop: spacing.xl * 2,
    backgroundColor: colors.bg,
  },
});
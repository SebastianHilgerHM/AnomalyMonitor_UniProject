import { ScrollView, StyleSheet } from 'react-native';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import { spacing, colors } from '../../constants/theme';

export default function MyAnomalies() {
  return (
    <ScrollView style={styles.container}>
      <SubTitle title="ASSIGNED TO YOU" />
      <Title title="My Anomalies" />
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
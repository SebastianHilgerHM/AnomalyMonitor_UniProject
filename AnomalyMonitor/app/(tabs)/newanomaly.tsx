import { View,StyleSheet } from 'react-native';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import Img from '../../components/img';
import TextField from '../../components/textfield';
import { spacing, colors } from '../../constants/theme';

export default function NewAnomaly() {
  return (
    <View style={styles.container}>
      <SubTitle title="CREATE A REPORT" />
      <Title title="New Anomaly" />
    </View>
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
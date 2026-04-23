import { View,StyleSheet } from 'react-native';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import Img from '../../components/img';
import TextField from '../../components/textfield';
import { spacing, colors } from '../../constants/theme';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Static hero/content block for the app landing tab. */}
      <Img source={require('../../assets/images/heroimage.jpg')} alt="Placeholder" style={{}} />
      <SubTitle title="NASA ANOMALY MONITOR" />
      <Title title="Home" />
      <TextField text="Review the mission status, recent activity, and the most important anomaly alerts in one place." />
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
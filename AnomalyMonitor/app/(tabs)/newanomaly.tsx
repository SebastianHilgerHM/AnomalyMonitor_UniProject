import { StyleSheet, ScrollView } from 'react-native';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import AppTextInput from '../../components/apptextinput';
import AppImageInput from '../../components/appimageinput';
import Button from '../../components/button';
import { spacing, colors } from '../../constants/theme';

export default function NewAnomaly() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SubTitle title="CREATE A REPORT" />
      <Title title="New Anomaly" />
      <AppTextInput 
        label="NAME"
        value='Enter mission name here'
        editable={false}
      />
      <AppTextInput 
        label="DESCRIPTION"
        value='Describe your new anomaly here'
        multiline
        editable={false}
      />
      <AppImageInput
        label="IMAGE"
        source={require('../../assets/images/heroimage.jpg')}
      />
      <Button label="SAVE ANOMALY" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl * 2,
  }
});
import { StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAnomalies } from '../../context/anomalyprovider';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import AppTextInput from '../../components/apptextinput';
import AppImageInput from '../../components/appimageinput';
import Button from '../../components/button';
import { spacing, colors } from '../../constants/theme';

export default function NewAnomaly() {
  const [name,setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string|null>(null);
  const {addAnomaly} = useAnomalies();
  const router = useRouter();

  const handleSave = () => {
    // Trim inputs so whitespace-only values do not pass validation.
    const cleanName = name.trim();
    const cleanDescription= description.trim();

    // Require the core report fields before creating an anomaly.
    if (!cleanName || !cleanDescription) return;

    // Persist in context so the new item appears immediately in My Anomalies.
    addAnomaly({
      title:cleanName,
      description: cleanDescription,
      imageUri: imageUri ?? undefined,
    });

    // Reset local form state after successful save.
    setName('');
    setDescription('');
    setImageUri(null);

    // Route user to the saved anomalies list.
    router.push('/(tabs)/myanomalies');
  };

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
        value={name}
        onChangeText={setName}
        editable={true}
        />
      <AppTextInput 
        label="DESCRIPTION"
        value={description}
        onChangeText={setDescription}
        multiline
        editable={true}
        />
      <AppImageInput
        label="IMAGE"
        value={imageUri}
        onChangeImage={setImageUri}
        />
      <Button label="SAVE ANOMALY" onPress={handleSave} />
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
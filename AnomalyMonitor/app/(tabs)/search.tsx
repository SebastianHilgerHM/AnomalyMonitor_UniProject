import { View, ScrollView, StyleSheet } from 'react-native';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import DateInput from '../../components/dateinput';
import SearchCard from '../../components/searchcard';
import Button from '../../components/button';
import { spacing, colors } from '../../constants/theme';

export default function Search() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SubTitle title="EXPLORE RECORDS" />
      <Title title="APOD Search" />
      <View style={styles.dateRow}>
        <View style={styles.dateCol}>
          <DateInput label="FROM" placeholder='20. Mar 2026' />
        </View>
        <View style={styles.dateCol}>
          <DateInput label="TO" placeholder='26. Mar 2026' />
        </View>
      </View>
      <Button label='Search'></Button>
      <SearchCard
        source={require('../../assets/images/heroimage.jpg')}
        alt="Placeholder"
        style={{}}
        date="26-03-2026"
        title="Black Holes and Neutron Stars: 218 Mergers and Counting"
        desc="What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves...What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves..."
      />
      <SearchCard
        source={require('../../assets/images/heroimage.jpg')}
        alt="Placeholder"
        style={{}}
        date="26-03-2026"
        title="Black Holes and Neutron Stars: 218 Mergers and Counting"
        desc="What is the sound of two black holes merging in deep space? Sound Waves don't propagate in vacuum, but gravitational waves..."
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
  content: {
    gap: spacing.md,
  },
  dateCol: {
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
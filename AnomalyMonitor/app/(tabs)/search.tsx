import { View, ScrollView, StyleSheet, Text, Pressable, ActivityIndicator, Platform } from 'react-native';
import { useMemo, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import SearchCard from '../../components/searchcard';
import Button from '../../components/button';
import { spacing, colors } from '../../constants/theme';

type ApodApiItem = {
  date: string;
  title: string;
  explanation: string;
  media_type: string;
  url?: string;
  hdurl?: string;
};

type SearchItem = {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const APOD_API_KEY = 'DEMO_KEY';

function formatDateForApi(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function formatDateForUI(d: Date) {
  return d.toLocaleDateString();
}

export default function Search() {
  const [fromDate, setFromDate] = useState<Date>(() =>  {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  });
  const [toDate, setToDate] = useState<Date>(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

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
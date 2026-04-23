import { View, ScrollView, StyleSheet, Text, Pressable, ActivityIndicator, Platform } from 'react-native';
import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import SearchCard from '../../components/searchcard';
import Button from '../../components/button';
import SmallButton from '../../components/smallbutton';
import { spacing, colors, radius, fontsize } from '../../constants/theme';
import { useApodSearch } from '../../hooks/useApodSearch';

function formatDateForUI(d: Date) {
  return d.toLocaleDateString();
}

export default function Search() {
  const router = useRouter();
  const [fromDate, setFromDate] = useState<Date>(() =>  {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  });
  const [toDate, setToDate] = useState<Date>(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const { loading, error, results, search } = useApodSearch();

  const fromLabel = useMemo(() => formatDateForUI(fromDate), [fromDate]);
  const toLabel = useMemo(() => formatDateForUI(toDate), [toDate]);

  const onChangeFrom = (event:DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowFromPicker(false);
    if (selectedDate) setFromDate(selectedDate);
  }

  const onChangeTo = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowToPicker(false);
    if (selectedDate) setToDate(selectedDate);
  };

  const handleSearch = async () => {
    await search(fromDate, toDate);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <SubTitle title="EXPLORE RECORDS" />
        <SmallButton label="Map" onPress={() => router.push('/(tabs)/worldmap')} />
      </View>
      <Title title="APOD Search" />
      <View style={styles.dateRow}>
        <View style={styles.dateCol}>
          <Text style={styles.label}>FROM</Text>
          <Pressable style={styles.dateBox} onPress={() => setShowFromPicker(true)}>
            <Text style={styles.dateText}>{fromLabel}</Text>
          </Pressable>
        </View>
        <View style={styles.dateCol}>
          <Text style={styles.label}>TO</Text>
          <Pressable style={styles.dateBox} onPress={() => setShowToPicker(true)}>
            <Text style={styles.dateText}>{toLabel}</Text>
          </Pressable>
        </View>
      </View>

      {showFromPicker && (
        <DateTimePicker value={fromDate} mode="date" display="default" onChange={onChangeFrom} />
      )}
      {showToPicker && (
        <DateTimePicker value={toDate} mode="date" display="default" onChange={onChangeTo} />
      )}

      <Button label='Search' onPress={handleSearch} />

      {loading && <ActivityIndicator color={colors.ctaaccent} />}
      {error && <Text style={styles.error}>{error}</Text>}

      {results.map((item) => (
        <SearchCard
          key={item.date + item.title}
          source={{ uri: item.imageUrl }}
          alt={item.title}
          date={item.date}
          title={item.title}
          desc={item.description}
          author={item.author}
        />
      ))}
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
    gap: spacing.md,
  },
  dateCol: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  label: {
    color: colors.textsecondary,
    fontSize: fontsize.b3,
    marginBottom: spacing.xs,
  },
  dateBox: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  dateText: {
    color: colors.textprimary,
    fontSize: fontsize.b2,
  },
  error: {
    color: '#ef4444',
  },
});
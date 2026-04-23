import { View, ScrollView, StyleSheet, Text, Pressable, ActivityIndicator, Platform } from 'react-native';
import { useMemo, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Title from '../../components/title';
import SubTitle from '../../components/subtitle';
import SearchCard from '../../components/searchcard';
import Button from '../../components/button';
import { spacing, colors, radius, fontsize } from '../../constants/theme';

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>;
  const [results, setresults] = useState<SearchItem[]>([]);

  const fromLabel = useMemo(() => formatDateForUI(fromDate), [fromDate]);
  const toLabel = useMemo(() => formatDateForUI(toDate), [toDate]);

  const onChangeFrom = (event:DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowFromPicker(false);
    if (selectedDate) setToDate(selectedDate);
  }

  const onChangeTo = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowToPicker(false);
    if (selectedDate) setToDate(selectedDate);
  };

  const handleSearch = async () => {
    if (fromDate > toDate) {
      setError('FROM date must be before TO date.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const startDate = formatDateForApi(fromDate);
      const endDate = formatDateForApi(toDate);

      const url = 'https://api.nasa.gov/planetary/apod?api_key=' + APOD_API_KEY + '&start_date=' + startDate + '&end_date=' + endDate;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('APOD request failed with status ' + response.status);
      }

      const data = (await response.json()) as ApodApiItem[];

      const imagesOnly = data.filter((item) => item.media_type === 'image').map((item) => ({
        date: item.date,
        title: item.title,
        description: item.explanation,
        imageUrl:  item.hdurl || item.url || '',
        category: 'APOD image',
      })).filter((item) => item.imageUrl.length > 0).sort((a, b) => (a.date < b.date ? 1 : -1));
      setresults(imagesOnly);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      setresults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SubTitle title="EXPLORE RECORDS" />
      <Title title="APOD Search" />
      <View style={styles.dateRow}>
        <View style={styles.dateCol}>
          <Text style={styles.label}>FROM</Text>
          <Pressable style={styles.dateBox} onPress={() => setShowFromPicker(true)}>
            <Text style={styles.dateText}>{fromLabel}</Text>
          </Pressable>
        </View>
        <View style={styles.dateCol}>
          <Text style={styles.label}>FROM</Text>
          <Pressable style={styles.dateBox} onPress={() => setShowFromPicker(true)}>
            <Text style={styles.dateText}>{fromLabel}</Text>
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
          author={item.category}
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
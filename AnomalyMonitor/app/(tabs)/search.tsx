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
  copyright?: string;
  url?: string;
  hdurl?: string;
};

type SearchItem = {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  author: string;
}

const APOD_API_KEY = 'DEMO_KEY';
const MAX_RETRIES = 2;
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
  const [error, setError] = useState<string|null>(null);
  const [results, setResults] = useState<SearchItem[]>([]);

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

      let response: Response | null = null;
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        const currentResponse = await fetch(url);
        if (currentResponse.ok) {
          response = currentResponse;
          break;
        }

        const shouldRetry = RETRYABLE_STATUS.has(currentResponse.status) && attempt < MAX_RETRIES;
        if (!shouldRetry) {
          if (currentResponse.status === 503) {
            throw new Error('NASA APOD is temporarily unavailable (503). Please try again in a minute.');
          }
          if (currentResponse.status === 429) {
            throw new Error('Too many APOD requests right now (429). Please wait a bit and retry.');
          }
          throw new Error('APOD request failed with status ' + currentResponse.status);
        }

        await wait(800 * (attempt + 1));
      }

      if (!response) {
        throw new Error('APOD request failed after multiple retries.');
      }

      const payload = (await response.json()) as ApodApiItem[] | ApodApiItem;
      const data = Array.isArray(payload) ? payload : [payload];

      const imagesOnly = data.filter((item) => item.media_type === 'image').map((item) => ({
        date: item.date,
        title: item.title,
        description: item.explanation,
        imageUrl:  item.hdurl || item.url || '',
        category: 'APOD image',
        author: item.copyright?.trim() || 'Unknown APOD author',
      })).filter((item) => item.imageUrl.length > 0).sort((a, b) => (a.date < b.date ? 1 : -1));
      setResults(imagesOnly);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      setResults([]);
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
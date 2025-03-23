import AsyncStorage from '@react-native-async-storage/async-storage';
import {messageHelper} from './helpers';

const STORAGE_KEY = 'read_books';

export const saveReadBookHelper = async (book: any) => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    let readBooks = storedData ? JSON.parse(storedData) : [];

    const isAlreadyRead = readBooks.some((b: any) => b.id === book.id);

    if (!isAlreadyRead) {
      readBooks.push(book);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(readBooks));
    }
  } catch (error) {
    console.error('Error saving book:', error);
  }
};

export const getReadBooksHelper = async () => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error loading books:', error);
    return [];
  }
};

export const isBookReadHelper = async (bookId: number) => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    const readBooks = storedData ? JSON.parse(storedData) : [];
    return readBooks.some((b: any) => b.id === bookId);
  } catch (error) {
    console.error('Error checking book:', error);
    return false;
  }
};

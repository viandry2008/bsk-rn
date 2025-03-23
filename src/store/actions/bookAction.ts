import axios from 'axios';
import {Dispatch} from 'react';
import {getAllBooks, getBookDetail, getCategories} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

interface GetBooksByCategory {
  readonly type: 'GetBooksByCategory';
  payload: any;
  hasScrolled: boolean;
  nextLink: any;
}
interface GetBookDetail {
  readonly type: 'GetBookDetail';
  payload: any;
  bookPdf: any;
}
interface GetBookBanner {
  readonly type: 'GetBookBanner';
  payload: any;
  loading: boolean;
}
interface GetBooksTrending {
  readonly type: 'GetBooksTrending';
  payload: any;
  loading: boolean;
}
interface GetBooksFeatured {
  readonly type: 'GetBooksFeatured';
  payload: any;
  loading: boolean;
}
interface GetBooksLatest {
  readonly type: 'GetBooksLatest';
  payload: any;
  hasScrolled: boolean;
  nextLink: any;
}
interface GetAllBooks {
  readonly type: 'GetAllBooks';
  payload: any;
  hasScrolled: boolean;
  nextLink: any;
}
interface GetBooksByCategoryHome {
  readonly type: 'GetBooksByCategoryHome';
  payload: any;
  loading: boolean;
}

export type BookAction =
  | GetBooksByCategory
  | GetBookDetail
  | GetBookBanner
  | GetBooksTrending
  | GetBooksFeatured
  | GetBooksLatest
  | GetAllBooks
  | GetBooksByCategoryHome;

export const getBooksByCategoryAction = (
  category: any,
  page: any,
  query: any,
  navigation: any,
  currentData: any,
) => {
  return async (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: 'GetBooksByCategory',
      payload: currentData,
      hasScrolled: true,
      nextLink: page,
    });
    try {
      const res = await axios.get(
        getAllBooks({
          category: category?.slug,
          type: '',
          limit: 10,
          page: page,
          query: query == '' ? '' : query,
        }),
        headerAxiosHelper(),
      );
      console.log('res GetBooksByCategory', res.data);

      dispatch({
        type: 'GetBooksByCategory',
        payload: [...currentData, ...res.data.data],
        hasScrolled: false,
        nextLink: parseInt(res.data.paging?.page) + 1,
      });

      navigation == null ? null : navigation.navigate('BookCategory', category);
    } catch (err: any) {
      console.log('err GetBooksByCategory', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksByCategory',
        payload: [],
        hasScrolled: false,
        nextLink: null,
      });
    }
  };
};

export const getBookDetailAction = (id: any, navigation: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      const res = await axios.get(getBookDetail({id: id}), headerAxiosHelper());
      console.log('res GetBookDetail', res.data);

      let bookFile;

      res.data?.resources?.map((item: any) => {
        if (item?.rel == 'book_file') {
          bookFile = item?.href;
        }
      });

      dispatch({
        type: 'GetBookDetail',
        payload: res.data,
        bookPdf: bookFile,
      });

      navigation == null ? null : navigation.navigate('BookDetail');
    } catch (err: any) {
      console.log('err GetBookDetail', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBookDetail',
        payload: '',
        bookPdf: '',
      });
    }
  };
};

export const getBookBannerAction = () => {
  return async (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: 'GetBookBanner',
      payload: [],
      loading: true,
    });
    try {
      const res = await axios.get(
        getAllBooks({
          category: '',
          type: 'latest',
          page: 1,
          limit: 1,
          query: '',
        }),
        headerAxiosHelper(),
      );
      console.log('res getBookBannerAction', res.data);

      dispatch({
        type: 'GetBookBanner',
        payload: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      console.log('err getBookBannerAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBookBanner',
        payload: [],
        loading: false,
      });
    }
  };
};

export const getBooksTrendingAction = (limit: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: 'GetBooksTrending',
      payload: [],
      loading: true,
    });
    try {
      const res = await axios.get(
        getAllBooks({
          category: '',
          type: 'popular',
          page: 1,
          limit: limit,
          query: '',
        }),
        headerAxiosHelper(),
      );
      console.log('res getBooksTrendingAction', res.data);

      dispatch({
        type: 'GetBooksTrending',
        payload: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      console.log('err getBooksTrendingAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksTrending',
        payload: [],
        loading: false,
      });
    }
  };
};

export const getBooksFeaturedActions = (limit: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: 'GetBooksFeatured',
      payload: [],
      loading: true,
    });
    try {
      const res = await axios.get(
        getAllBooks({
          category: '',
          type: 'featured',
          page: 1,
          limit: limit,
          query: '',
        }),
        headerAxiosHelper(),
      );
      console.log('res getBooksFeaturedActions', res.data);

      dispatch({
        type: 'GetBooksFeatured',
        payload: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      console.log('err getBooksFeaturedActions', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksFeatured',
        payload: [],
        loading: false,
      });
    }
  };
};

export const getBooksLatestAction = (
  category: any,
  page: any,
  currentData: any,
  type: 'paging' | 'first',
) => {
  return async (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: 'GetBooksLatest',
      payload: currentData,
      hasScrolled: true,
      nextLink: page,
    });
    try {
      const res = await axios.get(
        getAllBooks({
          category: category,
          type: 'latest',
          page: page,
          limit: 10,
          query: '',
        }),
        headerAxiosHelper(),
      );
      console.log('res getBooksLatestAction', res.data);

      dispatch({
        type: 'GetBooksLatest',
        payload: [...currentData, ...res.data.data],
        hasScrolled: false,
        nextLink: parseInt(res.data.paging?.page) + 1,
      });
    } catch (err: any) {
      console.log('err getBooksLatestAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksLatest',
        payload: [],
        hasScrolled: false,
        nextLink: null,
      });
    }
  };
};

export const getAllBooksAction = (
  type: any,
  page: any,
  query: any,
  currentData: any,
) => {
  return async (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: 'GetAllBooks',
      payload: currentData,
      hasScrolled: true,
      nextLink: page,
    });
    try {
      const res = await axios.get(
        getAllBooks({
          category: '',
          type: type,
          page: page,
          limit: 10,
          query: query == '' ? '' : query,
        }),
        headerAxiosHelper(),
      );
      console.log('res getAllBooksAction', res.data);

      dispatch({
        type: 'GetAllBooks',
        payload: [...currentData, ...res.data.data],
        hasScrolled: false,
        nextLink: parseInt(res.data.paging?.page) + 1,
      });
    } catch (err: any) {
      console.log('err getAllBooksAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAllBooks',
        payload: [],
        hasScrolled: false,
        nextLink: null,
      });
    }
  };
};

export const getBooksByCategoryHomeAction = () => {
  return async (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: 'GetBooksByCategoryHome',
      payload: [],
      loading: true,
    });
    try {
      const resCategories = await axios.get(getCategories, headerAxiosHelper());
      const categories = resCategories.data;

      console.log('Categories Response:', categories);

      const booksByCategory = await Promise.all(
        categories.map(async (category: any) => {
          try {
            const resBooks = await axios.get(
              getAllBooks({
                category: category?.slug,
                type: '',
                limit: 10,
                page: 1,
                query: '',
              }),
              headerAxiosHelper(),
            );
            return {
              category_id: category.id,
              slug: category.slug,
              text: category.text,
              books: resBooks.data.data,
            };
          } catch (error) {
            console.error(
              `Error fetching books for category: ${category.slug}`,
              error,
            );
            return {
              category_id: category.id,
              slug: category.slug,
              text: category.text,
              books: [],
            };
          }
        }),
      );

      console.log('Books by Category Response:', booksByCategory);

      dispatch({
        type: 'GetBooksByCategoryHome',
        payload: booksByCategory,
        loading: false,
      });
    } catch (err: any) {
      console.log('err GetBooksByCategoryHome', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksByCategoryHome',
        payload: [],
        loading: false,
      });
    }
  };
};

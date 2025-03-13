import axios from 'axios';
import {Dispatch} from 'react';
import {
  getAllBooks,
  getBookDetail,
  getBooks,
  getBooksByCategory,
} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

interface GetBooksByCategory {
  readonly type: 'GetBooksByCategory';
  payload: any;
  banner: any;
}
interface GetBookDetail {
  readonly type: 'GetBookDetail';
  payload: any;
}
interface GetBooks {
  readonly type: 'GetBooks';
  payload: any;
}

// NEW
interface GetBooksTrending {
  readonly type: 'GetBooksTrending';
  payload: any;
}
interface GetBooksFeatured {
  readonly type: 'GetBooksFeatured';
  payload: any;
}
interface GetBooksLatest {
  readonly type: 'GetBooksLatest';
  payload: any;
}
interface GetAllBooks {
  readonly type: 'GetAllBooks';
  payload: any;
}

export type BookAction =
  | GetBooksByCategory
  | GetBookDetail
  | GetBooks
  | GetBooksTrending
  | GetBooksFeatured
  | GetBooksLatest
  | GetAllBooks;

export const getBooksByCategoryAction = (
  category: any,
  page: any,
  navigation: any,
) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      const res = await axios.get(
        getBooksByCategory({
          category: category == '' ? '' : category?.slug,
          page: page,
        }),
        headerAxiosHelper(),
      );
      console.log('res GetBooksByCategory', res.data);

      dispatch({
        type: 'GetBooksByCategory',
        payload: res.data.data,
        banner: res.data.data[0],
      });

      navigation == null ? null : navigation.navigate('BookCategory', category);
    } catch (err: any) {
      console.log('err GetBooksByCategory', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksByCategory',
        payload: [],
        banner: '',
      });
    }
  };
};

export const getBookDetailAction = (id: any, navigation: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      const res = await axios.get(getBookDetail({id: id}), headerAxiosHelper());
      console.log('res GetBookDetail', res.data);

      dispatch({
        type: 'GetBookDetail',
        payload: res.data,
      });

      navigation == null ? null : navigation.navigate('BookDetail');
    } catch (err: any) {
      console.log('err GetBookDetail', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBookDetail',
        payload: '',
      });
    }
  };
};

export const getBooksAction = (page: any, categoryId: any, search: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      const res = await axios.get(
        getBooks({page: page, category: categoryId, search: search}),
        headerAxiosHelper(),
      );
      console.log('res GetBooks', res.data);

      dispatch({
        type: 'GetBooks',
        payload: res.data.data,
      });
    } catch (err: any) {
      console.log('err GetBooks', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooks',
        payload: [],
      });
    }
  };
};

// NEW
export const getBooksTrendingAction = (limit: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
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
      });
    } catch (err: any) {
      console.log('err getBooksTrendingAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksTrending',
        payload: [],
      });
    }
  };
};

export const getBooksFeaturedActions = (limit: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
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
      });
    } catch (err: any) {
      console.log('err getBooksFeaturedActions', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksFeatured',
        payload: [],
      });
    }
  };
};

export const getBooksLatestAction = (category: any, page: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
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
        payload: res.data.data,
      });
    } catch (err: any) {
      console.log('err getBooksLatestAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksLatest',
        payload: [],
      });
    }
  };
};

export const getAllBooksAction = (type: any, page: any, query: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
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
        payload: res.data.data,
      });
    } catch (err: any) {
      console.log('err getAllBooksAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAllBooks',
        payload: [],
      });
    }
  };
};

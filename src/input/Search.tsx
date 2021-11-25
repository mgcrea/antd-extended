// @docs https://ant.design/components/input/

import AntDesignSearch, {SearchProps as AntDesignSearchProps} from 'antd/lib/input/Search';
import React, {FunctionComponent, useCallback} from 'react';
import {useDebounce} from './../hooks';
import {applySizeProps, SizeType} from './../utils';
import './style/search-input.less';

export type SearchProps = Omit<AntDesignSearchProps, 'size'> & {
  wait?: number;
  size?: SizeType;
};

export const Search: FunctionComponent<SearchProps> = ({wait = 400, size, className, onSearch, ...otherProps}) => {
  const handleSearch = useCallback(
    (searchValue) => {
      console.warn('handleSearch', searchValue);
      if (onSearch) {
        onSearch(searchValue);
      }
    },
    [onSearch],
  );

  const debouncedSearch = useDebounce(handleSearch, wait, {leading: false});

  const handleChange = useCallback<NonNullable<SearchProps['onChange']>>(
    (ev) => {
      const {value} = ev.target;
      wait ? debouncedSearch(value) : handleSearch(value);
    },
    [wait, handleSearch, debouncedSearch],
  );

  return (
    <AntDesignSearch
      placeholder="Rechercher"
      onSearch={handleSearch}
      onChange={handleChange}
      {...applySizeProps('ant-input-search', {size, className})}
      {...otherProps}
    />
  );
};

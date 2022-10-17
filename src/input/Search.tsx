// @docs https://ant.design/components/input/

import AntDesignSearch, {SearchProps as AntDesignSearchProps} from 'antd/es/input/Search';
import React, {FunctionComponent, useCallback} from 'react';
import {useDebounce} from './../hooks';
import {applySizeProps, SizeType} from './../utils';
import './style/search.less';

export type SearchProps = Omit<AntDesignSearchProps, 'size'> & {
  debounce?: number;
  size?: SizeType;
};

export const Search: FunctionComponent<SearchProps> = ({
  debounce = 400,
  size,
  className,
  onSearch,
  onChange,
  ...otherProps
}) => {
  const handleSearch = useCallback(
    (searchValue: string) => {
      if (onSearch) {
        onSearch(searchValue);
      }
    },
    [onSearch],
  );

  const debouncedSearch = useDebounce(handleSearch, debounce);

  const handleChange = useCallback<NonNullable<SearchProps['onChange']>>(
    (event, ...otherArgs) => {
      if (onChange) {
        onChange(event, ...otherArgs);
      }
      if (event.defaultPrevented) {
        return;
      }
      const {value} = event.target;
      debounce ? debouncedSearch(value) : handleSearch(value);
    },
    [debounce, handleSearch, onChange, debouncedSearch],
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

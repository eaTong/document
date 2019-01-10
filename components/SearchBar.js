/**
 * Created by eatong on 16-11-2.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Button} from 'antd';

const InputGroup = Input.Group;
const Search = Input.Search;

class SearchBar extends React.Component {
  componentWillMount() {
    this.state.value = this.props.intialValue;
    console.log(this.props.value);
  }

  state = {
    value: ''
  };

  search(val) {
    this.props.onSearch && this.props.onSearch(val);
  }

  onChange(value) {
    this.setState({value});
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    return (
      <div className="x6-search-bar">
        <Search
          value={this.state.value}
          placeholder={this.props.placeholder || '搜索'}
          onSearch={(val) => this.search(val)}
          onChange={(val) => this.onChange(val.target.value)}
          className='search-input'
          size="small"
          ref={searchBar => this.searchBar = searchBar}
        />
      </div>
    )
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  autoBlur: PropTypes.bool,
  onChange: PropTypes.func,
};
export default SearchBar;

/**
*
* ReactTableFilters
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'reactstrap';

class ReactTableFilters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  componentDidMount() {
    var searchText = document.getElementById("searchText");
    searchText.addEventListener("keyup", this.handleSearchText);
  }

  componentWillUnmount() {
    var searchText = document.getElementById("searchText");
    searchText.removeEventListener("keyup", this.handleSearchText);
  }

  handleSearchText(event) {
    setTimeout(function(){  this.props.filter(event.target.value) }.bind(this), 1000);
  }

  render() {
    const { filter, headers = {}, path } = this.props;
    const { searchText, recPerPage, status  } = headers;
    
    return (
        <Col className={"ReactTableFilters"}>
            <div className={"reactTableSearch"}>
                <label className={"reactTableSearchLabel"}>
                    Search:  
                    <input type="text" id="searchText" className={"reactTableSearchInput"} placeholder="Type to search…" defaultValue={searchText}/>
                </label>
            </div> 
        </Col>
    );
  }
  
 
}

export default ReactTableFilters;

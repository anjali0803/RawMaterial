import Charts from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

const labels = ['test1', 'test2'];
const records = ['test1', 'test2'];
const title = 'test';
const type = 'test';

describe('<Charts />', () => {
  it('should have props equal to the provided props', () => {
    const wrapper = mount(
      <Charts
        title={title}
        type={type}
        labels={labels}
        records={records}
      />
    );
    expect(wrapper.props().title).toEqual(title);
    expect(wrapper.props().type).toEqual(type);
    expect(wrapper.props().labels).toEqual(labels);
    expect(wrapper.props().records).toEqual(records);
  });
});

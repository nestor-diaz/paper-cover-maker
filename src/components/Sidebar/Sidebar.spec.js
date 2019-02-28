import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  test('should render its default content', () => {
    const SidebarComponent = shallow(<Sidebar />);

    expect(SidebarComponent).toMatchSnapshot();
  });

  test('should call onSave function when the save button in the Footer is clicked', () => {
    const onSaveFn = jest.fn();
    const SidebarComponent = shallow(<Sidebar onSave={onSaveFn} />);

    SidebarComponent.find('Footer').prop('onSave')();

    expect(onSaveFn).toHaveBeenCalled();
  });
});

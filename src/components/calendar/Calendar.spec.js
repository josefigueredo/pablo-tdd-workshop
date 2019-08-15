import React from 'react';
import Calendar from './Calendar';
import { shallow } from 'enzyme';

const props = {};
const setup = (anotherProps = {}) => {
    const newProps = {
        ...props,
        ...anotherProps,
    };
    const wrapper = shallow(<Calendar {...newProps} />);

    return {
        wrapper,
        instance: wrapper.instance(),
    };
};

describe('Calendar', () => {
    const { wrapper } = setup();
    it('smoke test', () => {
        expect(wrapper.exists()).toBe(true);
    });
})
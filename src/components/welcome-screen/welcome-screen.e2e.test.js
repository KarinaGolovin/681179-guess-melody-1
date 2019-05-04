import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Button click should click`, () => {
  const clickHandler = jest.fn();
  const component = shallow(
      <WelcomeScreen
        time={0}
        errorCount={0}
        onClick={clickHandler}
      />
  );

  component.find(`button`).simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withAudio from "./with-audio";

configure({adapter: new Adapter()});

const MockComponent = ({renderAudio, onPlayButtonClick}) => <div>
  {renderAudio()}
  <button className={`click-me`} onClick={onPlayButtonClick} />
</div>;
MockComponent.propTypes = {
  renderAudio: PropTypes.func,
  onPlayButtonClick: PropTypes.func,
};

const MockComponentWrapped = withAudio(MockComponent);

it(`Should properly set isPlaying state`, () => {
  const handlePlayButtonClick = jest.fn();
  const wrapper = mount(<MockComponentWrapped isPlaying={false} trackSrc={``} handlePlayButtonClick={handlePlayButtonClick} />);

  expect(wrapper.state().isPlaying).toEqual(false);

  wrapper.find(`.click-me`).simulate(`click`);

  expect(wrapper.state().isPlaying).toEqual(true);
});

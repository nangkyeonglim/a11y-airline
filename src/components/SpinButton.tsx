import React, { useState, MouseEvent } from 'react';
import './SpinButton.css';

const PASSENGER = {
  MAX: 3,
  MIN: 0,
};

const SpinButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [screenReaderMessage, setScreenReaderMessage] = useState('');

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    setScreenReaderMessage(`성인 승객 추가 ${count + 1}`);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    setScreenReaderMessage(`성인 승객 감소 ${count - 1}`);
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <section className='spinButtonContainer'>
      <div>
        <h1>승객 선택</h1>
        <div className='spinButtonLabel'>
          <label>성인</label>
          <div
            className='helpIcon'
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            ?
            {isTooltipVisible && (
              <span className='tooltip'>최대 인원수는 3명까지 가능합니다</span>
            )}
          </div>
        </div>
        <button
          onClick={decrement}
          className='spinButton'
          aria-label='성인 탑승자 한명 줄이기'
          disabled={count === PASSENGER.MIN}
        >
          -
        </button>
        <input
          type='text'
          role='spinbutton'
          readOnly
          className='spinButtonInput'
          value={count}
          aria-valuemin={PASSENGER.MIN}
          aria-valuemax={PASSENGER.MAX}
          aria-label={`성인 ${count} 텍스트 숫자만 수정`}
        />
        <button
          onClick={increment}
          className='spinButton'
          aria-label='성인 탑승자 한명 늘리기'
          disabled={count === PASSENGER.MAX}
        >
          +
        </button>
        <div
          id='liveRegion'
          aria-live='assertive'
          style={{
            position: 'absolute',
            overflow: 'hidden',
            width: '0px',
            height: '0px',
          }}
        >
          {screenReaderMessage}
        </div>
      </div>
    </section>
  );
};

export default SpinButton;

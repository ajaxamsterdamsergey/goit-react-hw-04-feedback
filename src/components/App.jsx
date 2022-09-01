//import React, { Component } from 'react';
import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Box } from 'components/Box';
import { GlobalStyle } from './GlobalStyle';

const INITIAL_VALUES = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {
  const defaultProps = {
    title: 'Please leave feadback',
    message: 'There is no feedback',
  };
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = event => {
    const name = event.target.name;

    switch (name) {
      case 'good':
        setGood(state => state + 1);
        break;

      case 'neutral':
        setNeutral(state => state + 1);
        break;

      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        return;
    }
  };
  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage1 = (good, total) => {
    return Math.round((good / total) * 100);
  };
  const positivCountFeedBack = countPositiveFeedbackPercentage1(good, total);

  return (
    <Box
      width={284}
      m="auto"
      mt={30}
      boxShadow="0 2px 5px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.2)"
      borderRadius="2px"
    >
      <Box width={254} m="auto">
        <Section title={defaultProps.title}>
          <FeedbackOptions
            onLeaveFeedback={onLeaveFeedback}
            onLeave={INITIAL_VALUES}
          />
          {total > 0 ? (
            <Statistics
              onLeave={{ good, neutral, bad }}
              total={total}
              positivCountFeedBack={positivCountFeedBack}
            />
          ) : (
            <Notification message={defaultProps.message} />
          )}
        </Section>
        <GlobalStyle />
      </Box>
    </Box>
  );
}

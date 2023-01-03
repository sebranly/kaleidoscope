import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Footer } from '../Footer';

test('Footer', () => {
  const createComponent = () => <Footer />;

  render(createComponent());
  const author1Element = screen.getByText(/sebranly/);
  const author2Element = screen.getByText(/StephaneBranly/);

  expect(author1Element).toBeInTheDocument();
  expect(author2Element).toBeInTheDocument();
});

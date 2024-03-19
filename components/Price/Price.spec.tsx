import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Price from './Price';

describe('Price Component', () => {
  it('renders the price without promotion correctly', () => {
    render(
      <Price
        priceStyle="regularPrice"
        promotion={0}
        strike="strikeThrough"
        price={100}
      />
    );
    const priceElement = screen.getByText('$100');
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveClass('regularPrice');
    expect(priceElement).not.toHaveClass('strikeThrough');
    // expect(screen.queryByText(/^\$\d+/)).toHaveLength(1); // Only one price is displayed
  });

  it('renders the price with promotion correctly', () => {
    render(
      <Price
        priceStyle="regularPrice"
        promotion={80}
        strike="strikeThrough"
        price={100}
      />
    );
    const originalPriceElement = screen.getByText('$100');
    const promotionalPriceElement = screen.getByText('$80');

    // Check if the original price is displayed with strikeThrough class
    expect(originalPriceElement).toBeInTheDocument();
    expect(originalPriceElement).toHaveClass('strikeThrough');

    // Check if the promotional price is displayed
    expect(promotionalPriceElement).toBeInTheDocument();
    expect(promotionalPriceElement).toHaveClass('regularPrice');

    // Ensure both prices are displayed
    expect(screen.getAllByText(/^\$\d+/)).toHaveLength(2);
  });
});

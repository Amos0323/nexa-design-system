import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaMetricCard } from './NexaMetricCard'
describe('NexaMetricCard', () => {
  it('renders the value, label, trend and supporting context as text', () => {
    renderNexa(
      <NexaMetricCard
        label="Active learners"
        value="1,284"
        trend="+8.4% this month"
        supportingText="All departments"
      />,
    )
    expect(
      screen.getByRole('region', { name: 'Active learners' }),
    ).toHaveTextContent('1,284')
    expect(screen.getByText('+8.4% this month')).toBeVisible()
    expect(screen.getByText('All departments')).toBeVisible()
  })
})

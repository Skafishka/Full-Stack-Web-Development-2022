import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = [
    {
        title: '111',
        author: 'Genrich'
    },
    {
        title: 'again',
        author: 'Jakob'
    }
  ]

  render(<Blog blogs={blog} />)

  const element = screen.getAllByText('111')
  screen.debug(element)

  expect(element).toBeDefined()
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
/*
test('clicking the View button shows the blogs url and number of likes', async () => {
  const blog = [
    {
      title: '111',
      author: 'Genrich',
      likes: 56,
      url: 'www.genrich.net'
    },
    {
      title: 'again',
      author: 'Jakob',
      likes: 89,
      url: 'www.jakob.net'
    }
  ]

  const mockHandler = jest.fn()

  render(
    <Blog blogs={blog} toggleVisibility={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getAllByText('www.jakob.net')
  screen.debug(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})*/
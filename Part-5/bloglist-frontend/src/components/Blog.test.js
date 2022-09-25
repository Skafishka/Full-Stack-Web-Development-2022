import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('5.13: Blog list tests, step1: renders content', () => {
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

test('5.15: Blog list tests, step3: clicking the Likes button twice calls event handler twice', async () => {
  const blog = [
    {
      title: '111',
      author: 'Genrich',
      likes: 56,
      url: 'www.genrich.net'
    }
  ]

  const mockHandler = jest.fn()

  render(
    <Blog blogs={blog} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('update likes')

  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
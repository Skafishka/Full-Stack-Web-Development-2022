import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('5.16: Blog list tests, step4 <BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(inputs[0], 'testing')
  await user.type(inputs[1], 'once')
  await user.type(inputs[2], 'more')
  await user.click(sendButton)

  expect(createBlog.mock.calls[0][0]['title']).toBe('testing')
  expect(createBlog.mock.calls[0][0]['author']).toBe('once')
  expect(createBlog.mock.calls[0][0]['url']).toBe('more')
  expect(createBlog.mock.calls).toHaveLength(1)
})
import React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {rest} from 'msw'
import Contacts from "../pages/Contacts";
import {theme} from "../App";
import {ThemeProvider} from "@mui/material";
import {server} from "../serverTests";

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('contacts get data', () => {
  const ComponentsWithTheme = () => {
    return (
      <ThemeProvider theme={theme}>
        <Contacts/>
      </ThemeProvider>
    )
  }

  test('loading', async () => {
    render(<ComponentsWithTheme/>)

    const loader = screen.getByTestId('contacts-loader')

    expect(loader).toBeInTheDocument()
    await waitForElementToBeRemoved(loader)
  })

  test('success', async () => {
    render(<ComponentsWithTheme/>)
    const loader = screen.getByTestId('contacts-loader')

    await waitForElementToBeRemoved(loader)

    expect(loader).not.toBeInTheDocument()
    expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument()
  })

  test('error', async () => {
    server.use(
      rest.get('https://randomuser.me/api/?results=10', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: 'Internal server error'
          }),
        )
      }),
    )

    render(<ComponentsWithTheme/>)
    const error = await screen.findByText('...something went wrong')
    expect(error).toBeInTheDocument()
  })
})


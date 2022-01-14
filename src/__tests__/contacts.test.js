import React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {rest} from 'msw'
import Contacts from "../pages/Contacts";
import {theme} from "../App";
import {ThemeProvider} from "@mui/material";
import {server} from "../serverTests";
import userEvent from '@testing-library/user-event'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const ComponentsWithTheme = () => {
  return (
    <ThemeProvider theme={theme}>
      <Contacts/>
    </ThemeProvider>
  )
}
// Tests for data fetching
describe('contacts get data', () => {
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

// Tests for view mode
describe('contacts data view mode', () => {
  test('should equal table', async () => {
    render(<ComponentsWithTheme/>)

    const loader = screen.getByTestId('contacts-loader')

    await waitForElementToBeRemoved(loader)

    expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument()
    expect(screen.getByTestId('toggle-data-viewmode-table')).toHaveStyle({
      color: 'rgba(0, 0, 0, 0.87)',
      'background-color': 'rgba(0, 0, 0, 0.08)'
    })

    expect(screen.queryByTestId('contacts-grid-container')).not.toBeInTheDocument()
    expect(screen.queryByTestId('toggle-data-viewmode-grid')).not.toHaveStyle({
      color: 'rgba(0, 0, 0, 0.87)',
      'background-color': 'rgba(0, 0, 0, 0.08)'
    })
  })

  test('switch from grid to table', async () => {
    render(<ComponentsWithTheme/>)

    const loader = screen.getByTestId('contacts-loader')

    await waitForElementToBeRemoved(loader)

    const gridToggle = screen.queryByTestId('toggle-data-viewmode-grid')
    const tableToggle = screen.queryByTestId('toggle-data-viewmode-table')
    userEvent.click(gridToggle)
    userEvent.click(tableToggle)

    expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument()
    expect(tableToggle).toHaveStyle({
      color: 'rgba(0, 0, 0, 0.87)',
      'background-color': 'rgba(0, 0, 0, 0.08)'
    })

    expect(screen.queryByTestId('contacts-grid-container')).not.toBeInTheDocument()
    expect(gridToggle).not.toHaveStyle({
      color: 'rgba(0, 0, 0, 0.87)',
      'background-color': 'rgba(0, 0, 0, 0.08)'
    })
  })

  test('should equal grid', async () => {
    render(<ComponentsWithTheme/>)

    const loader = screen.getByTestId('contacts-loader')

    await waitForElementToBeRemoved(loader)

    const gridToggle = screen.queryByTestId('toggle-data-viewmode-grid')
    userEvent.click(gridToggle)

    expect(screen.getByTestId('contacts-grid-container')).toBeInTheDocument()
    expect(gridToggle).toHaveStyle({
      color: 'rgba(0, 0, 0, 0.87)',
      'background-color': 'rgba(0, 0, 0, 0.08)'
    })

    expect(screen.queryByTestId('contacts-table-container')).not.toBeInTheDocument()
    expect(screen.queryByTestId('toggle-data-viewmode-table')).not.toHaveStyle({
      color: 'rgba(0, 0, 0, 0.87)',
      'background-color': 'rgba(0, 0, 0, 0.08)'
    })

    expect(localStorage.getItem('view')).toEqual('grid')
  })

  test('should equal grid with reload page', async () => {
    localStorage.setItem('view', 'grid')
    render(<ComponentsWithTheme/>)

    const loader = screen.getByTestId('contacts-loader')

    await waitForElementToBeRemoved(loader)

    expect(screen.getByTestId('contacts-grid-container')).toBeInTheDocument()
    expect(screen.queryByTestId('toggle-data-viewmode-grid')).toHaveStyle({
      color: 'rgba(0, 0, 0, 0.87)',
      'background-color': 'rgba(0, 0, 0, 0.08)'
    })

    expect(screen.queryByTestId('contacts-table-container')).not.toBeInTheDocument()
    expect(screen.queryByTestId('toggle-data-viewmode-table')).not.toHaveStyle({
      color: 'rgba(0, 0, 0, 0.87)',
      'background-color': 'rgba(0, 0, 0, 0.08)'
    })
  })
})


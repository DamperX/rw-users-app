import React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {rest} from 'msw'
import Contacts from "../pages/Contacts";
import {setupServer} from "msw/node";
import {theme} from "../App";
import {ThemeProvider} from "@mui/material";

const users = [{
  gender: "male",
  name: {
    title: "Mr",
    first: "Luis",
    last: "Lewis"
  },
  location: {
    street: {
      number: 7284,
      name: "The Avenue"
    },
    city: "Donabate",
    state: "Westmeath",
    country: "Ireland",
    postcode: 63349,
    coordinates: {
      latitude: "21.1658",
      longitude: "-168.1963"
    },
    timezone: {
      offset: "+5:30",
      description: "Bombay, Calcutta, Madras, New Delhi"
    }
  },
  email: "luis.lewis@example.com",
  login: {
    uuid: "a8bbd4e9-69db-4cd0-a03a-8558d4a06918",
    username: "brownmouse587",
    password: "1025",
    salt: "yJZTUZcx",
    md5: "ed20a44eb4b8856e13948b6f25993b23",
    sha1: "ec99c9cf9fe3854e85e12d00d26a5892eb7c6155",
    sha256: "30d959ea7aee1b5447bc8387e0ff12f6e04326f939db534d01ef158446c6b2cb"
  },
  dob: {
    date: "1962-02-09T12:04:33.266Z",
    age: 59
  },
  registered: {
    date: "2007-12-25T08:14:58.453Z",
    age: 14
  },
  phone: "061-360-4605",
  cell: "081-527-4568",
  id: {
    name: "PPS",
    value: "3869810T"
  },
  picture: {
    large: "https://randomuser.me/api/portraits/men/52.jpg",
    medium: "https://randomuser.me/api/portraits/med/men/52.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/52.jpg"
  },
  nat: "IE"
}]

const handlers = [
  rest.get('https://randomuser.me/api/?results=10', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: users,
      }),
    )
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const ComponentsWithTheme = () => {
  return <ThemeProvider theme={theme}>
    <Contacts/>
  </ThemeProvider>
}

describe('contacts get data', () => {
  test('loading', async () => {
    render(<ComponentsWithTheme />)

    const loader = screen.getByTestId('contacts-loader')

    expect(loader).toBeInTheDocument()
    await waitForElementToBeRemoved(loader)
  })

  test('success', async () => {
    render(<ComponentsWithTheme />)
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

    render(<ComponentsWithTheme />)
    const error = await screen.findByText('...something went wrong')
    expect(error).toBeInTheDocument()
  })
})


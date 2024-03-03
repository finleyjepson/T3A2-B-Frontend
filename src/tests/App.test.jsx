import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import userEvent from "@testing-library/user-event"
import App from "../App"
import Navbar from '../components/navigation/Navbar'
import Signup from '../components/auth/SignUp'
import Login from '../components/auth/Login'
import UserListContainer from '../components/users/UserListContainer'
import CreateEvent from '../components/events/CreateEvent'
import UserProfilePage from '../components/users/UserProfile'

describe('App / Home Component', () => {
    let container 
    beforeEach(() => {
        container = render(<App />).container // Run this before each 'it'
    })

    it('renders the header / ProfileDropdown component', () => {
        expect(screen.getByText('AnimeScreen')).toBeDefined() // Expect the 'AnimeScreen' app title heading        
    })
    it('goes to home / index(/) when app title is clicked', async () => {
        await userEvent.click(screen.getByText('AnimeScreen')) // Expect to go to index page (/) when clicking app title
        expect(screen.getByText('Upcoming Events')).toBeDefined() // Expect to see 'Upcoming Events' box
        expect(screen.getByText('Upcoming Anime')).toBeDefined() // Expect to see 'Upcoming Anime' box
    })
})

describe('Navbar Component', () => {
    it('renders the Navbar component', () => {
        render(<BrowserRouter><Navbar /></BrowserRouter>)
        expect(screen.getByText('Home')).toBeDefined()
        expect(screen.getByText('Contact Us')).toBeDefined()
        expect(screen.getByText('Events')).toBeDefined()
    })
    it('goes to index(/) when Home is clicked', async () => {
        render(<App />)
        await userEvent.click(screen.getByText('Home'))
        expect(screen.getByText('Upcoming Events')).toBeDefined()
        expect(screen.getByText('Upcoming Anime')).toBeDefined()
    })
    it('opens the contact modal when "Contact Us" button is clicked', () => {
        render(<BrowserRouter><Navbar /></BrowserRouter>)
        fireEvent.click(screen.getByText('Contact Us')) // Click the "Contact Us" button
        expect(screen.getByText("We'd love to hear from you")).toBeInTheDocument() // Expect that the modal is now open
    })
})

describe('Sign Up Component', () => {
    it('renders the Sign Up page', async () => {
        render(<MemoryRouter><Signup /></MemoryRouter>)
        expect(screen.getByText('Username')).toBeInTheDocument() // Expect to see 'Username' field
        expect(screen.getByText('Confirm password')).toBeInTheDocument() // Check if the "Confirm password" field is present
    })
    it('checks sign up button exists and can be clicked', async () => {
        render(<MemoryRouter><Signup /></MemoryRouter>)
        const signUpButton = screen.getByText('Sign up') // Set the sign up button text
        expect(signUpButton).toBeInTheDocument() // Expect that the sign up button exists
        fireEvent.click(signUpButton) // Simulate a button click on the sign up button
    })
})

describe('Login Component', () => {
    it('renders the Login page', async () => {
        render(<MemoryRouter><Login /></MemoryRouter>)
        expect(screen.getByText('Username')).toBeInTheDocument() // Expect to see 'Username' field
        expect(screen.getByText('Password')).toBeInTheDocument() // Expect to see 'Password' field
    })
    it('checks login button exists and can be clicked', async () => {
        render(<MemoryRouter><Login /></MemoryRouter>)
        const loginButton = screen.getByText('Login') // Set the login button text
        expect(loginButton).toBeInTheDocument() // Expect that the login button exists
        fireEvent.click(loginButton) // Simulate a button click on the login button
    })
    it('allows user to login with valid credentials', async () => {
        render(<MemoryRouter><Login /></MemoryRouter>)
        const usernameInput = screen.getByLabelText('Username')
        const passwordInput = screen.getByLabelText('Password')
        const loginButton = screen.getByText('Login')
        fireEvent.change(usernameInput, { target: { value: 'validUsername' } })
        fireEvent.change(passwordInput, { target: { value: 'validPassword' } })
        fireEvent.click(loginButton)
    })
})

describe('User List Component', () => {
    test('renders search input field', () => {
        render(<MemoryRouter><UserListContainer /></MemoryRouter>)
        const searchInput = screen.getByPlaceholderText('🔎 Search Users') // Set the placeholder text in searchbar
        expect(searchInput).toBeInTheDocument() // Expect to see the placeholder text in searchbar
    })
    test('renders Users heading', () => {
        render(<MemoryRouter><UserListContainer /></MemoryRouter>)
        expect(screen.getByText('Users')).toBeInTheDocument() // Expect the Users heading for container
    })
})

describe('Create Event Component', () => {
    test('renders the create event form', () => {
        sessionStorage.setItem('user', JSON.stringify({ isAdmin: true })) // Set isAdmin to true
        const categories = [{ _id: '1', name: 'Category 1' }, { _id: '2', name: 'Category 2' }] // Mock the categories prop to enable test
        render(<MemoryRouter><CreateEvent categories={categories}/></MemoryRouter>)
        expect(screen.getByText('Title')).toBeInTheDocument() // Expect the Title field
        expect(screen.getByText('Venue')).toBeInTheDocument() // Expect the Venue field
        expect(screen.getByText('Date')).toBeInTheDocument() // Expect the Date field
        expect(screen.getByText('Price')).toBeInTheDocument() // Expect the Price field
    })
    it('checks create event button exists and can be clicked', async () => {
        sessionStorage.setItem('user', JSON.stringify({ isAdmin: true }))
        const categories = [{ _id: '1', name: 'Category 1' }, { _id: '2', name: 'Category 2' }] // Mock the categories prop to enable test
        render(<MemoryRouter><CreateEvent categories={categories}/></MemoryRouter>)
        const createEventButton = screen.getByRole('button', { name: /create event/i }) // Set button labeled create event
        expect(createEventButton).toBeInTheDocument() // Expect the create event button to exist
        fireEvent.click(createEventButton) // Simulate a button click on the Create Event button
    })
})

describe('UserProfilePage Component', () => {
    it('renders the welcome message for the user', async () => {
      const user = { username: 'testUser' } // Set test username
      render(<UserProfilePage user={user} />) 
      expect(screen.getByText(`Welcome, ${user.username}!`)).toBeInTheDocument() // Expect welcome message for the username
    })
    it('renders the profile picture box', async () => {
        const user = { username: 'testUser' }
        render(<UserProfilePage user={user} />)
        expect(screen.getByText('Profile Picture')).toBeInTheDocument() // Expect the 'Profile Picture' box heading
    })
    it('updates the state when typing in the "Enter favourite anime" input field', async () => {
        const user = { username: 'testUser' }
        render(<UserProfilePage user={user} />)
        const inputField = screen.getByPlaceholderText('Enter favourite anime') // Set placeholder text 'Enter favourite anime'
        expect(inputField).toBeInTheDocument() // Expect to see the input field with placeholder text
        fireEvent.change(inputField, { target: { value: 'One Piece' } }) // Simulate typing in the input field
        expect(inputField).toHaveValue('One Piece') // Expect that the input value is updated in the component's state
      })
})
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import userEvent from "@testing-library/user-event"
import App from "../App"
import Navbar from '../components/navigation/Navbar'
import Signup from '../components/auth/SignUp'
import Login from '../components/auth/Login'

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
        render(<App />);
        await userEvent.click(screen.getByText('Home'))
        expect(screen.getByText('Upcoming Events')).toBeDefined();
        expect(screen.getByText('Upcoming Anime')).toBeDefined();
    })
})

describe('Sign Up Component', () => {
    it('renders the Sign Up page', async () => {
      render(<MemoryRouter><Signup /></MemoryRouter>);
      await screen.findByLabelText('Email'); // Await 'Email' field label
      expect(screen.getByText('Confirm password')).toBeInTheDocument() // Check if the "Confirm password" field is present
    });
})

describe('Login Component', () => {
    it('renders the Login page', async () => {
      render(<MemoryRouter><Login /></MemoryRouter>)
      expect(screen.getByText('Username')).toBeInTheDocument() // Expect to see 'Username' field
      expect(screen.getByText('Password')).toBeInTheDocument() // Expect to see 'Password' field
    })
})
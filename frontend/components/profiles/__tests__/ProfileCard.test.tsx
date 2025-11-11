import { render, screen } from '@testing-library/react';
import { ProfileCard } from '@/components/profiles/ProfileCard';
import { Profile } from '@/lib/types/Profile';

const mockProfile: Profile = {
  id: '1',
  username: 'test_user',
  email: 'test@example.com',
  bio: 'Test bio for testing purposes',
  created_at: '2025-01-15T10:30:00Z',
};

describe('ProfileCard', () => {
  it('renders profile information correctly', () => {
    render(<ProfileCard profile={mockProfile} />);

    expect(screen.getByText('test_user')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test bio for testing purposes')).toBeInTheDocument();
  });

  it('renders without bio when not provided', () => {
    const profileWithoutBio = { ...mockProfile, bio: undefined };
    render(<ProfileCard profile={profileWithoutBio} />);

    expect(screen.getByText('test_user')).toBeInTheDocument();
    expect(screen.queryByText('Test bio for testing purposes')).not.toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<ProfileCard profile={mockProfile} />);

    expect(screen.getByText(/Creado:/)).toBeInTheDocument();
  });

  it('has link to profile detail page', () => {
    render(<ProfileCard profile={mockProfile} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/profiles/1');
  });
});

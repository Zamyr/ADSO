import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileForm } from '@/components/profiles/ProfileForm';

describe('ProfileForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields', () => {
    render(<ProfileForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Biografía/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ProfileForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /Guardar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El nombre de usuario es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/El email es requerido/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    render(<ProfileForm onSubmit={mockOnSubmit} />);

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Guardar/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/debe ser válido/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates username minimum length', async () => {
    render(<ProfileForm onSubmit={mockOnSubmit} />);

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const submitButton = screen.getByRole('button', { name: /Guardar/i });

    fireEvent.change(usernameInput, { target: { value: 'ab' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El nombre debe tener al menos 3 caracteres/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<ProfileForm onSubmit={mockOnSubmit} />);

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const bioInput = screen.getByLabelText(/Biografía/i);
    const submitButton = screen.getByRole('button', { name: /Guardar/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(bioInput, { target: { value: 'Test bio' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        bio: 'Test bio',
      });
    });
  });

  it('pre-fills form with initial data', () => {
    const initialData = {
      username: 'existing_user',
      email: 'existing@example.com',
      bio: 'Existing bio',
    };

    render(<ProfileForm onSubmit={mockOnSubmit} initialData={initialData} />);

    expect(screen.getByDisplayValue('existing_user')).toBeInTheDocument();
    expect(screen.getByDisplayValue('existing@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing bio')).toBeInTheDocument();
  });

  it('disables form when loading', () => {
    render(<ProfileForm onSubmit={mockOnSubmit} isLoading={true} />);

    const usernameInput = screen.getByLabelText(/Nombre de usuario/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button');

    expect(usernameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Guardando...');
  });
});

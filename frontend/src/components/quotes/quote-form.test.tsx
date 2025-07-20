import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuoteForm } from './quote-form';

describe('QuoteForm', () => {
  it('submits the form with filled values', async () => {
    const handleSubmit = jest.fn();
    render(<QuoteForm companyId="c1" companyName="Test Co" onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/nome completo/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/telefone/i), '123');

    await userEvent.click(screen.getByRole('button', { name: /solicitar orçamento gratuito/i }));

    expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      companyId: 'c1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123'
    }));
  });
});

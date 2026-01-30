import { render, screen, within } from '@testing-library/react';
import ExampleRagServiceTable from '../ExampleRagServiceTable';

describe('ExampleRagServiceTable', () => {
  it('renders the table headers', () => {
    render(<ExampleRagServiceTable />);

    expect(screen.getByText('Local service')).toBeInTheDocument();
    expect(screen.getByText('AWS equivalent')).toBeInTheDocument();
    expect(screen.getByText('Responsibility')).toBeInTheDocument();
  });

  it('renders the gateway mapping row', () => {
    render(<ExampleRagServiceTable />);

    const gatewayCell = screen.getByText('Gateway');
    const row = gatewayCell.closest('tr');
    expect(row).not.toBeNull();

    const cells = within(row as HTMLTableRowElement).getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('WebSocket connections + local “Lambda” invocations');
    expect(cells[2]).toHaveTextContent('API Gateway');
  });

  it('renders the LanceDB mapping row', () => {
    render(<ExampleRagServiceTable />);

    const lancedbCell = screen.getByText('LanceDB');
    const row = lancedbCell.closest('tr');
    expect(row).not.toBeNull();

    const cells = within(row as HTMLTableRowElement).getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('Vector store, backed by MinIO / S3‑style storage');
    expect(cells[2]).toHaveTextContent('LanceDB with S3 backend');
  });
});


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const InvoicesPage = () => {
  const { user } = useAuth();
  // Mock data for now
  const [invoices, setInvoices] = useState([
    { id: 1, date: '2024-07-15', description: 'Consulta de Cardiologia', amount: 250.00, status: 'Pendente' },
    { id: 2, date: '2024-06-20', description: 'Exames Laboratoriais', amount: 150.00, status: 'Paga' },
    { id: 3, date: '2024-05-10', description: 'Sessão de Fisioterapia', amount: 100.00, status: 'Pendente' },
  ]);

  const handleConfirmInvoice = (id: number) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id ? { ...invoice, status: 'Confirmada' } : invoice
    ));
    // In a real application, you would send this update to the backend
    alert(`Fatura ${id} confirmada!`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Minhas Faturas Médicas</h2>

      <Card>
        <CardHeader>
          <CardTitle>Faturas</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {invoice.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          invoice.status === 'Paga' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {invoice.status === 'Pendente' && (
                          <Button onClick={() => handleConfirmInvoice(invoice.id)} variant="outline">Confirmar</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhuma fatura encontrada.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;

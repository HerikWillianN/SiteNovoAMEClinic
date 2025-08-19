
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const PaymentMethodsPage = () => {
  const { user } = useAuth();
  // Mock data for now
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Credit Card', last4: '4242', brand: 'Visa' },
    { id: 2, type: 'Credit Card', last4: '1234', brand: 'Mastercard' },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Formas de Pagamento</h2>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Forma de Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Número do Cartão" name="cardNumber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Data de Validade (MM/AA)" name="expiryDate" />
            <Input label="CVV" name="cvv" />
          </div>
          <Input label="Nome no Cartão" name="cardHolderName" />
          <div className="flex justify-end">
            <Button>Adicionar Cartão</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Minhas Formas de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          {paymentMethods.length > 0 ? (
            <ul className="space-y-4">
              {paymentMethods.map((method) => (
                <li key={method.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <p className="font-semibold">{method.brand} **** **** **** {method.last4}</p>
                    <p className="text-sm text-gray-500">{method.type}</p>
                  </div>
                  <Button variant="destructive">Remover</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Nenhuma forma de pagamento cadastrada.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodsPage;

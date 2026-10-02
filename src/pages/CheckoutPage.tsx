import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/format';
import type { OrderDetails } from '../types';

type CustomerData = OrderDetails['formData'];
const initialData: CustomerData = { name: '', phone: '', cep: '', address: '', number: '', complement: '', neighborhood: '', city: '', observations: '' };
const addressFields: { key: keyof CustomerData; label: string; placeholder: string; autoComplete: string; required: boolean }[] = [
  { key: 'cep', label: 'CEP', placeholder: '00000-000', autoComplete: 'postal-code', required: true },
  { key: 'address', label: 'Rua / logradouro', placeholder: 'Rua das Flores', autoComplete: 'address-line1', required: true },
  { key: 'number', label: 'Número', placeholder: '123 ou S/N', autoComplete: 'off', required: true },
  { key: 'complement', label: 'Complemento', placeholder: 'Apartamento, bloco...', autoComplete: 'address-line2', required: false },
  { key: 'neighborhood', label: 'Bairro', placeholder: 'Seu bairro', autoComplete: 'off', required: true },
  { key: 'city', label: 'Cidade / UF', placeholder: 'São Paulo / SP', autoComplete: 'address-level2', required: true },
];

export function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [error, setError] = useState('');
  const update = (key: keyof CustomerData, value: string) => { setFormData(previous => ({ ...previous, [key]: value })); setError(''); };
  const finish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.length) return;
    const mandatory: (keyof CustomerData)[] = deliveryMethod === 'delivery' ? ['name', 'phone', 'cep', 'address', 'number', 'neighborhood', 'city'] : ['name', 'phone'];
    const missing = mandatory.find(key => !formData[key].trim());
    if (missing) { setError('Preencha os campos obrigatórios antes de confirmar.'); document.getElementById(`checkout-${missing}`)?.focus(); return; }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!/^[0-9()+ .-]+$/.test(formData.phone) || phoneDigits.length < 10 || phoneDigits.length > 13) {
      setError('Informe um telefone válido com DDD.');
      document.getElementById('checkout-phone')?.focus();
      return;
    }
    const order: OrderDetails = { cart: [...cart], subtotal, formData, deliveryMethod, orderNumber: `AC-${(crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`).slice(0, 8).toUpperCase()}` };
    clearCart();
    navigate('/pedido-confirmado', { state: order });
  };
  if (!cart.length) return <section className="page-container flex min-h-[60vh] flex-col items-center justify-center gap-4 py-12 text-center"><ShoppingBag className="h-12 w-12 text-[#b93857]" /><h1 className="text-2xl font-bold">Seu carrinho está vazio</h1><p className="text-gray-600">Escolha seus produtos antes de finalizar o pedido.</p><Link to="/catalogo" className="rounded-full bg-[#b93857] px-6 py-3 font-bold text-white">Explorar produtos</Link></section>;
  return <section className="page-container py-8 sm:py-12">
    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900"><Info className="mt-0.5 h-5 w-5 shrink-0" /><p><strong>Compra de demonstração.</strong> Você pode usar dados fictícios. Nenhuma cobrança ou encomenda real será realizada.</p></div>
    <Link to="/catalogo" className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gray-600"><ArrowLeft className="h-4 w-4" /> Voltar à loja</Link>
    <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">Finalizar pedido</h1>
    <form onSubmit={finish} className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
        <section className="checkout-card"><h2 className="mb-5 text-lg font-bold">Seus dados</h2><div className="grid gap-4">
          <div><label htmlFor="checkout-name" className="field-label">Nome completo *</label><input id="checkout-name" name="name" autoComplete="name" required minLength={2} maxLength={100} value={formData.name} onChange={event => update('name', event.target.value)} placeholder="Seu nome completo" className="field-input" /></div>
          <div><label htmlFor="checkout-phone" className="field-label">WhatsApp / celular *</label><input id="checkout-phone" name="phone" type="tel" autoComplete="tel" required minLength={10} maxLength={20} title="Informe o telefone com DDD, por exemplo (11) 99999-9999." value={formData.phone} onChange={event => update('phone', event.target.value)} placeholder="(11) 99999-9999" className="field-input" /><p className="mt-1 text-sm text-gray-500">Inclua o DDD.</p></div>
        </div></section>
        <section className="checkout-card"><h2 className="mb-5 text-lg font-bold">Entrega</h2>
          <fieldset><legend className="sr-only">Como deseja receber o pedido?</legend><div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">{[{ value: 'delivery', label: 'Receber no endereço' }, { value: 'pickup', label: 'Retirar no ateliê' }].map(method => <label key={method.value} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border p-3 text-sm font-semibold ${deliveryMethod === method.value ? 'border-[#b93857] bg-pink-50 text-[#b93857]' : 'border-pink-100 text-gray-700'}`}><input type="radio" name="deliveryMethod" value={method.value} checked={deliveryMethod === method.value} onChange={() => setDeliveryMethod(method.value as 'delivery' | 'pickup')} className="h-4 w-4 accent-[#b93857]" />{method.label}</label>)}</div></fieldset>
          {deliveryMethod === 'delivery' ? <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{addressFields.map(field => <div key={field.key} className={field.key === 'address' ? 'sm:col-span-2' : ''}><label htmlFor={`checkout-${field.key}`} className="field-label">{field.label}{field.required ? ' *' : ''}</label><input id={`checkout-${field.key}`} name={field.key} autoComplete={field.autoComplete} required={field.required} maxLength={150} inputMode={field.key === 'cep' ? 'numeric' : undefined} pattern={field.key === 'cep' ? '[0-9]{5}-?[0-9]{3}' : undefined} title={field.key === 'cep' ? 'Informe um CEP com 8 números.' : undefined} placeholder={field.placeholder} value={formData[field.key]} onChange={event => update(field.key, event.target.value)} className="field-input" /></div>)}</div> : <p className="mt-4 text-sm leading-relaxed text-gray-600">O local e o horário de retirada devem ser combinados com o ateliê. Neste projeto, a retirada é apenas simulada.</p>}
          <div className="mt-5"><label htmlFor="checkout-observations" className="field-label">Observações do pedido</label><textarea id="checkout-observations" name="observations" rows={3} maxLength={1000} value={formData.observations} onChange={event => update('observations', event.target.value)} placeholder="Algum detalhe que devemos saber?" className="field-input resize-y" /></div>
        </section>
      </div>
      <section className="checkout-summary checkout-card min-w-0 lg:col-span-5" aria-label="Resumo do pedido">
        <h2 className="mb-4 text-lg font-bold">Resumo do pedido ({cart.length})</h2>
        <ul className="space-y-4">{cart.map((item, index) => <li key={index} className="flex items-start gap-3 border-b border-pink-100 pb-4"><img src={item.product.imageUrl} alt="" width="48" height="48" className="h-12 w-12 shrink-0 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="text-sm font-bold leading-snug">{item.product.name}</p><p className="mt-1 text-sm text-gray-600">{item.quantity} unidade(s) · {formatPrice(item.totalPrice)}</p>{Object.entries(item.customValues).map(([key, value]) => <p key={key} className="mt-1 break-words text-sm text-gray-500">{item.product.customizationOptions.find(option => option.id === key)?.label ?? key}: {value}</p>)}</div></li>)}</ul>
        <dl className="mt-5 space-y-3 text-sm"><div className="flex flex-wrap justify-between gap-2"><dt>Subtotal</dt><dd className="font-bold">{formatPrice(subtotal)}</dd></div><div className="flex flex-wrap justify-between gap-2"><dt>Frete</dt><dd>{deliveryMethod === 'pickup' ? 'Retirada no ateliê' : 'A combinar com o ateliê'}</dd></div><div className="flex flex-wrap justify-between gap-2 border-t border-pink-100 pt-3 text-lg font-extrabold"><dt>Total dos produtos</dt><dd className="text-[#b93857]">{formatPrice(subtotal)}</dd></div></dl>
        <p className="mt-3 text-sm text-gray-600">{deliveryMethod === 'delivery' ? 'O valor acima não inclui frete.' : 'Não há cobrança de frete para retirada.'}</p>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button type="submit" className="mt-5 min-h-12 w-full rounded-full bg-[#b93857] px-5 py-3 text-sm font-bold text-white hover:bg-[#982d47]">Confirmar pedido de demonstração</button>
      </section>
    </form>
  </section>;
}

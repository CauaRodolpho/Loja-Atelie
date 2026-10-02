import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import type { OrderDetails } from '../types';
import { formatPrice } from '../utils/format';

export function OrderSuccessPage() {
  const { state } = useLocation();
  const order = state as OrderDetails | null;
  if (!order?.cart || !order.formData) return <Navigate to="/catalogo" replace />;
  return <section className="page-container py-8 sm:py-12"><div className="mx-auto max-w-3xl rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-8">
    <div className="text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" /><p className="mt-4 text-sm font-bold text-[#b93857]">{order.orderNumber}</p><h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Pedido de demonstração concluído!</h1><p className="mt-3 text-base leading-relaxed text-gray-600">Obrigado por conhecer o AnaCraft, {order.formData.name}.</p></div>
    <h2 className="mb-4 mt-8 text-lg font-bold">Seus produtos</h2>
    <ul className="space-y-4">{order.cart.map((item, index) => <li key={index} className="flex items-start gap-3 rounded-2xl bg-pink-50/50 p-3 sm:p-4"><img src={item.product.imageUrl} alt="" width="64" height="64" className="h-16 w-16 shrink-0 rounded-xl object-cover" /><div className="min-w-0 flex-1"><h3 className="text-sm font-bold sm:text-base">{item.product.name}</h3><p className="mt-1 text-sm text-gray-600">{item.quantity} unidade(s) · {formatPrice(item.totalPrice)}</p>{Object.entries(item.customValues).map(([key, value]) => <p key={key} className="mt-1 break-words text-sm text-gray-600">{item.product.customizationOptions.find(option => option.id === key)?.label ?? key}: {value}</p>)}</div></li>)}</ul>
    <dl className="mt-6 space-y-3 border-t border-pink-100 pt-5 text-sm"><div className="flex flex-wrap justify-between gap-2"><dt>Recebimento</dt><dd>{order.deliveryMethod === 'pickup' ? 'Retirada no ateliê' : 'Entrega no endereço'}</dd></div><div className="flex flex-wrap justify-between gap-2 text-lg font-bold"><dt>Total dos produtos</dt><dd className="text-[#b93857]">{formatPrice(order.subtotal)}</dd></div></dl>
    <p className="mt-3 text-sm text-gray-500">{order.deliveryMethod === 'delivery' ? 'Frete não incluído no total da simulação.' : 'Retirada simulada, sem frete.'}</p>
    <p className="mt-6 rounded-xl bg-pink-50 p-4 text-sm leading-relaxed text-gray-600">Você concluiu uma compra demonstrativa. Nenhum pagamento foi realizado e nenhum pedido real foi enviado.</p>
    <Link to="/catalogo" className="mt-8 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#b93857] px-5 py-3 font-bold text-white">Continuar explorando <ArrowRight className="h-4 w-4" /></Link>
  </div></section>;
}

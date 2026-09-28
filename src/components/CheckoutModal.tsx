import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types/art';
import { X, Check, ShieldCheck, Printer, ArrowLeft, CreditCard, Landmark, FileText, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  couponCode?: string;
  onCompleteOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  couponCode,
  onCompleteOrder
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'e.vance@vancecollection.org',
    address: '45 Rue des Beaux-Arts',
    city: 'Paris',
    postalCode: '75006',
    country: 'France',
    collectorNotes: 'Gate code 4821. Please require two-person art handler delivery; hang in ground floor salon.',
    paymentMethod: 'card'
  });
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const subtotal = items.reduce((acc, item) => acc + item.itemTotal, 0);
  const shipping = subtotal >= 1000 || items.length === 0 ? 0 : 65;
  const tax = Math.round((subtotal - appliedDiscount) * 0.05);
  const total = subtotal - appliedDiscount + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `ACQ-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const hash = `HAHN-${Math.random().toString(36).substring(2, 10).toUpperCase()}-SECURE`;

    const newOrder: OrderDetails = {
      orderId,
      items: [...items],
      subtotal,
      shipping,
      discount: appliedDiscount,
      tax,
      total,
      couponCode,
      customer: { ...formData },
      paymentMethod: formData.paymentMethod,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      authenticityRecordHash: hash
    };

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    onCompleteOrder();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#faf8f5] border border-stone-300 rounded-xs shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-medium text-stone-900">
              {step === 'form' ? 'Acquisition & Consignment Checkout' : 'Acquisition Dossier & Invoice'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Checkout Form */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Order Brief Summary */}
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                  Acquisition Summary ({items.length} works)
                </div>
                <div className="font-serif text-lg text-stone-900 font-medium">
                  Total Payable: ${total.toLocaleString()}
                </div>
                <div className="text-xs text-stone-500">
                  Includes museum crating, provenance certification, and fully insured transit.
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-white border border-emerald-200 px-3 py-1.5 rounded-xs font-mono self-start sm:self-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Escrow Protected</span>
              </div>
            </div>

            {/* Collector Contact & Shipping Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-stone-900 font-medium border-b border-stone-200 pb-2">
                Collector & Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Collector Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full py-2 px-3 bg-white border border-stone-300 rounded-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Direct Email (for Provenance Registry) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full py-2 px-3 bg-white border border-stone-300 rounded-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-medium mb-1">
                    Delivery Address (Private Salon or Residence) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full py-2 px-3 bg-white border border-stone-300 rounded-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full py-2 px-3 bg-white border border-stone-300 rounded-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Postal Code / Country *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full py-2 px-3 bg-white border border-stone-300 rounded-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full py-2 px-3 bg-white border border-stone-300 rounded-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-medium mb-1">
                    White-Glove Art Handler Delivery Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.collectorNotes}
                    onChange={(e) => setFormData({ ...formData, collectorNotes: e.target.value })}
                    className="w-full py-2 px-3 bg-white border border-stone-300 rounded-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    placeholder="Provide any gate security codes, freight elevator requirements, or preferred delivery timing..."
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg text-stone-900 font-medium border-b border-stone-200 pb-2">
                Settlement & Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-3.5 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-4 h-4 text-stone-800" />
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                  </div>
                  <div className="font-medium text-xs text-stone-900">Black Card / Amex</div>
                  <div className="text-[11px] text-stone-500">Instant Authorization</div>
                </label>

                <label
                  className={`p-3.5 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'wire'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Landmark className="w-4 h-4 text-stone-800" />
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'wire'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                  </div>
                  <div className="font-medium text-xs text-stone-900">Institutional Wire</div>
                  <div className="text-[11px] text-stone-500">Bank-to-Bank Escrow</div>
                </label>

                <label
                  className={`p-3.5 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'house'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-4 h-4 text-stone-800" />
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'house'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'house' })}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                  </div>
                  <div className="font-medium text-xs text-stone-900">Salon House Account</div>
                  <div className="text-[11px] text-stone-500">Net 30 Invoicing</div>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                Return to Bag
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xs transition-all shadow-md flex items-center gap-2"
              >
                <span>Authorize & Confirm Acquisition (${total.toLocaleString()})</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Confirmed Acquisition Dossier / Invoice */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto bg-white">
            <div className="text-center space-y-2 border-b border-stone-200 pb-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
                Official Accession Confirmed
              </div>
              <h2 className="font-serif text-3xl text-stone-900 font-normal">
                Acquisition Certificate #{confirmedOrder.orderId}
              </h2>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Your purchase has been formally registered into the Salon Permanent Archive. A sealed Hahnemühle Certificate of Authenticity is being prepared.
              </p>
            </div>

            {/* Accession Details */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-3 border-b border-stone-200 font-mono">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Acquisition Ref</span>
                  <span className="font-bold text-stone-900">{confirmedOrder.orderId}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Recorded Date</span>
                  <span className="text-stone-900">{confirmedOrder.createdAt}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Holographic Hash</span>
                  <span className="text-stone-900">{confirmedOrder.authenticityRecordHash}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Payment</span>
                  <span className="text-stone-900 capitalize">{confirmedOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Items Acquired */}
              <div className="space-y-2">
                <span className="font-semibold text-stone-800 block uppercase tracking-wider text-[10px]">
                  Catalogued Artworks Acquired
                </span>
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-stone-100 last:border-0">
                    <div>
                      <span className="font-serif font-medium text-stone-900">{item.artwork.title}</span>
                      <span className="text-stone-500 ml-2">by {item.artwork.artist}</span>
                      <div className="text-[11px] text-stone-400">
                        {item.selectedFrame.name} (Qty: {item.quantity})
                      </div>
                    </div>
                    <span className="font-mono tabular-nums font-medium text-stone-900">
                      ${item.itemTotal.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Destination */}
              <div className="pt-3 border-t border-stone-200 text-stone-600 text-[11px]">
                <span className="font-semibold text-stone-900 block mb-0.5">Consignment Destination:</span>
                <div>{confirmedOrder.customer.name} · {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.country}</div>
                {confirmedOrder.customer.collectorNotes && (
                  <div className="italic text-stone-500 mt-1">
                    Special Handler Note: &ldquo;{confirmedOrder.customer.collectorNotes}&rdquo;
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-medium rounded-xs transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Collector Invoice</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xs transition-colors"
              >
                Return to Vernissage Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

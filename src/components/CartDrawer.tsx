import React, { useState } from 'react';
import { CartItem } from '../types/art';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: (appliedDiscount: number, couponCode?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.itemTotal, 0);
  const shipping = subtotal >= 1000 || items.length === 0 ? 0 : 65;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const tax = Math.round((subtotal - discountAmount) * 0.05);
  const total = subtotal - discountAmount + shipping + tax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'VERNISSAGE10' || code === 'SALON10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Collector Patron discount applied!');
    } else if (code === 'PATRON20') {
      setDiscountPercent(20);
      setCouponSuccess('20% Vernissage Founder discount applied!');
    } else {
      setCouponError('Invalid collector promotion code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf8f5] border-l border-stone-300 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif text-xl font-medium text-stone-900">
                Acquisition Bag
              </h2>
              <span className="text-xs font-mono text-stone-400">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'item' : 'items'})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 font-serif text-xl">
                  ∅
                </div>
                <div className="font-serif text-xl text-stone-800">Your acquisition bag is empty</div>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Browse our curated exhibition to acquire original paintings, rare stone lithographs, or artisanal pigments.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-medium rounded-xs hover:bg-stone-800"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-4 bg-white border border-stone-200 rounded-xs shadow-xs flex gap-4 items-start"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-stone-100 border border-stone-200 shrink-0 overflow-hidden flex items-center justify-center p-1 rounded-xs">
                      <img
                        src={item.artwork.image}
                        alt={item.artwork.title}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Information & controls */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-mono text-stone-400 uppercase truncate">
                            {item.artwork.artist}
                          </div>
                          <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                            {item.artwork.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-stone-400 hover:text-stone-700 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-1">
                        Frame: <span className="font-medium text-stone-700">{item.selectedFrame.name}</span>
                        {item.selectedFrame.price > 0 && ` (+$${item.selectedFrame.price})`}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-stone-200 rounded-xs bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 text-stone-600 hover:text-stone-950 transition-colors"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 text-stone-600 hover:text-stone-950 transition-colors"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono text-sm font-semibold text-stone-900 tabular-nums">
                          ${item.itemTotal.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer & Financial Breakdown */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-4">
              {/* Promo code box */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Collector Code (e.g. VERNISSAGE10)"
                      className="w-full text-xs py-2 px-3 bg-stone-50 border border-stone-300 rounded-xs uppercase tracking-wider font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-medium rounded-xs transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && (
                  <div className="text-[11px] text-emerald-800 font-mono">{couponSuccess}</div>
                )}
                {couponError && (
                  <div className="text-[11px] text-red-600 font-mono">{couponError}</div>
                )}
              </form>

              {/* Financial Lines */}
              <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Collector Discount ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums font-medium">
                      -${discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span>Museum Climate Crating</span>
                    {shipping === 0 && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded-xs font-mono">
                        Free &gt; $1k
                      </span>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Fine Art Tax</span>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    ${tax.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                  <span>Total Acquisition Investment</span>
                  <span className="text-xl font-serif font-bold font-mono tabular-nums">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Museum Authenticity Seal */}
              <div className="flex items-center gap-2 p-2 bg-stone-50 border border-stone-200 rounded-xs text-[11px] text-stone-600">
                <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                <span>Includes insured transit & official signed provenance dossier.</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onCheckout(discountAmount, discountPercent > 0 ? 'VERNISSAGE10' : undefined)}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Acquisition Checkout</span>
                <ArrowRight className="w-4 h-4 text-stone-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

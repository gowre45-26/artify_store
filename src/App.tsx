/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Artwork, ArtCategory, FrameOption, CartItem } from './types/art';
import { ARTWORKS, FRAME_OPTIONS } from './data/artworks';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VirtualGalleryWall } from './components/VirtualGalleryWall';
import { ProductGrid } from './components/ProductGrid';
import { ArtworkModal } from './components/ArtworkModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CuratorNotes } from './components/CuratorNotes';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'vernissage_art_cart_v1';
const LOCAL_STORAGE_WISHLIST_KEY = 'vernissage_art_wishlist_v1';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ArtCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set(['art-01', 'art-03']);
    } catch {
      return new Set(['art-01', 'art-03']);
    }
  });

  // Modals & Drawers state
  const [selectedArtworkForModal, setSelectedArtworkForModal] = useState<Artwork | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isVirtualWallOpen, setIsVirtualWallOpen] = useState(false);
  const [virtualWallArtId, setVirtualWallArtId] = useState<string>(ARTWORKS[0].id);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutCoupon, setCheckoutCoupon] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(Array.from(wishlistIds)));
    } catch {
      // storage unavailable
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Add to Cart handler
  const handleAddToCart = (artwork: Artwork, frame: FrameOption = FRAME_OPTIONS[0]) => {
    const unitPrice = artwork.price + (artwork.framingCompatible ? frame.price : 0);
    const cartItemId = `${artwork.id}_${frame.id}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: item.quantity + 1,
                itemTotal: (item.quantity + 1) * unitPrice
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            artwork,
            quantity: 1,
            selectedFrame: frame,
            unitPrice,
            itemTotal: unitPrice
          }
        ];
      }
    });

    showToast(`Added "${artwork.title}" to acquisition bag`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              itemTotal: newQty * item.unitPrice
            }
          : item
      )
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Wishlist handler
  const handleToggleWishlist = (artworkId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(artworkId)) {
        next.delete(artworkId);
        showToast('Removed from saved wishlist');
      } else {
        next.add(artworkId);
        showToast('Saved to collector wishlist');
      }
      return next;
    });
  };

  // Open virtual wall with a specific artwork
  const handleOpenVirtualWallWithArt = (artworkId: string) => {
    setVirtualWallArtId(artworkId);
    setIsVirtualWallOpen(true);
    // Smooth scroll to virtual wall section
    setTimeout(() => {
      const el = document.getElementById('virtual-gallery-wall-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleCheckoutInitiate = (discount: number, coupon?: string) => {
    setCheckoutDiscount(discount);
    setCheckoutCoupon(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartValue = cartItems.reduce((acc, i) => acc + i.itemTotal, 0);

  const wishlistArtworks = ARTWORKS.filter((art) => wishlistIds.has(art.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-stone-800 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xs shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          const el = document.getElementById('collection-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        cartTotal={totalCartValue}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenVirtualWall={() => {
          setIsVirtualWallOpen(true);
          const el = document.getElementById('virtual-gallery-wall-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch(!showSearch)}
      />

      <main className="flex-1">
        {/* Exhibition Hero */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('collection-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenVirtualWall={() => {
            setIsVirtualWallOpen(true);
            const el = document.getElementById('virtual-gallery-wall-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive Virtual Gallery Wall Preview */}
        {isVirtualWallOpen && (
          <div id="virtual-gallery-wall-section" className="scroll-mt-24">
            <VirtualGalleryWall
              artworks={ARTWORKS}
              selectedArtworkId={virtualWallArtId}
              onClose={() => setIsVirtualWallOpen(false)}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {/* Product Catalogue & Art Store Grid */}
        <ProductGrid
          artworks={ARTWORKS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onOpenQuickView={(art) => setSelectedArtworkForModal(art)}
          onOpenVirtualWallWithArt={handleOpenVirtualWallWithArt}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Curator Discourse & Atelier Craft Section */}
        <CuratorNotes />
      </main>

      {/* Institutional Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenVirtualWall={() => {
          setIsVirtualWallOpen(true);
          const el = document.getElementById('virtual-gallery-wall-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Artwork Inspection Modal */}
      <ArtworkModal
        artwork={selectedArtworkForModal}
        onClose={() => setSelectedArtworkForModal(null)}
        onAddToCart={handleAddToCart}
        onOpenVirtualWallWithArt={handleOpenVirtualWallWithArt}
        isWishlisted={selectedArtworkForModal ? wishlistIds.has(selectedArtworkForModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckoutInitiate}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistArtworks={wishlistArtworks}
        onRemoveFromWishlist={(id) => handleToggleWishlist(id)}
        onAddToCart={handleAddToCart}
        onOpenQuickView={(art) => setSelectedArtworkForModal(art)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedDiscount={checkoutDiscount}
        couponCode={checkoutCoupon}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}

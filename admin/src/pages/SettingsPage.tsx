import React, { useState, useEffect } from "react";
import { Store, Phone, Instagram, Facebook, CreditCard, Sparkles, MessageSquare } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

export default function SettingsPage() {
  const { settings, isLoadingSettings, updateSettings, showToast } = useAdmin();

  // Settings states
  const [shopName, setShopName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Sync settings when fetched
  useEffect(() => {
    if (settings) {
      setShopName(settings.shopName || "");
      setWhatsappNumber(settings.whatsappNumber || "");
      setInstagramLink(settings.instagramLink || "");
      setFacebookLink(settings.facebookLink || "");
      setPaymentLink(settings.paymentLink || "");
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopName.trim()) {
      showToast("Shop name is required.", "error");
      return;
    }

    setIsSaving(true);
    const success = await updateSettings({
      shopName: shopName.trim(),
      whatsappNumber: whatsappNumber.trim(),
      instagramLink: instagramLink.trim(),
      facebookLink: facebookLink.trim(),
      paymentLink: paymentLink.trim(),
    });
    setIsSaving(false);
  };

  if (isLoadingSettings) {
    return <Loader size="lg" message="Loading demo-web Configurations..." />;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto font-sans animate-in fade-in duration-300">
      <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-6 shadow-xs">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
            <Store className="w-5.5 h-5.5 text-emerald-700" />
            <span>Identity & Communication Settings</span>
          </h4>
          <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed font-sans">
            Customize links displayed on client landing pages.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Shop Name */}
          <Input
            label="demo-web Shop Name"
            placeholder="e.g., Vastra Saree Emporium"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            icon={<Store className="w-4.5 h-4.5 text-gray-400" />}
            disabled={isSaving}
          />

          {/* WhatsApp Support Row */}
          <div className="space-y-2">
            <Input
              label="WhatsApp Contact Number"
              placeholder="e.g., +919876543210 (Include country code)"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              icon={<Phone className="w-4.5 h-4.5 text-gray-400" />}
              disabled={isSaving}
              helperText='Please use country codes (e.g., "+919876543210" for India) so users can chat smoothly.'
            />
            {whatsappNumber && (
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between gap-3 text-xs text-emerald-800">
                <p className="flex items-center gap-1.5 font-medium leading-normal">
                  <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-pulse" />
                  <span>Interactive validation path matches:</span>
                  <span className="font-bold underline">{whatsappNumber.replace(/[^0-9]/g, "")}</span>
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-md flex items-center gap-1 leading-none shadow-xs text-[10px]"
                >
                  Test Link
                </a>
              </div>
            )}
          </div>

          {/* Social Links Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-50">
            <Input
              label="Instagram URL link"
              placeholder="e.g., https://instagram.com/vastra_demo-web"
              value={instagramLink}
              onChange={(e) => setInstagramLink(e.target.value)}
              icon={<Instagram className="w-4.5 h-4.5 text-gray-400" />}
              disabled={isSaving}
            />

            <Input
              label="Facebook URL link"
              placeholder="e.g., https://facebook.com/vastrasarees"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              icon={<Facebook className="w-4.5 h-4.5 text-gray-400" />}
              disabled={isSaving}
            />
          </div>

          {/* UPI Banking Payment QR Code Link */}
          <Input
            label="Instant Payment Link or UPI ID"
            placeholder="e.g., vastrasarees@okaxis or Google Pay / PhonePe custom payment URL"
            value={paymentLink}
            onChange={(e) => setPaymentLink(e.target.value)}
            icon={<CreditCard className="w-4.5 h-4.5 text-gray-400" />}
            disabled={isSaving}
            helperText="Allows quick checkouts by linking buyers to payment interfaces during purchase queries."
          />

          {/* Settings Trigger Buttons */}
          <div className="border-t border-gray-150 pt-5 flex justify-end">
            <Button type="submit" variant="primary" isLoading={isSaving}>
              Save Shop Settings
            </Button>
          </div>
        </form>
      </div>

      {/* Decorative Tips Alerts Panel (Ultra Premium Touch) */}
      <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50/20 p-5 space-y-2.5 text-xs text-emerald-950 font-sans">
        <h5 className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-emerald-700 animate-pulse" />
          <span>Shopfront Branding Strategies</span>
        </h5>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
          <li>Ensure WhatsApp credentials are fully entered to receive inquiries instantly.</li>
          <li>Make your payment link a standard UPI URL to enable direct scan-to-order capability.</li>
          <li>Keep your demo-web catalog optimized with unique designs to attract buyers.</li>
        </ul>
      </div>
    </div>
  );
}

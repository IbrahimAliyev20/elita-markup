import { postContactForm } from "@/pages/api/services/postContactForm";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export interface ContactFormResponse {
  success: boolean;
  message?: string;
}

interface ContactBannerProps {
  contactData?: {
    phone: string;
    email: string;
    map: string;
  } | null;
}

function ContactBanner({ contactData }: ContactBannerProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await postContactForm(formData);
      if (response) {
        setSubmitMessage({
          text: t("contact_success"),
          isError: false,
        });
        setFormData({ name: "", surname: "", phone: "", note: "" });
      } else {
        setSubmitMessage({
          text: t("contact_error_send"),
          isError: true,
        });
      }

    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitMessage({
        text: t("error_try_again"),
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!contactData) {
    return <p className="p-8 text-center text-white">{t("no_contact_info")}</p>;
  }

  return (
    <div className="bg-elements px-8 py-12 relative">
      <div className="absolute top-0 left-8 hidden md:block">
        <Image
          width={250}
          height={190}
          src="/images/icons/lamp.png"
          alt="Lamp"
          className="w-[250px] h-[190px] object-contain"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-8">
        <div className="text-white md:ml-10 pb-5 font-archivo">
          <h2 className="text-4xl font-light mb-6">{t("nav.contact")}</h2>
          <div className="space-y-2">
            {contactData.phone && (
              <p className="text-xl">{contactData.phone}</p>
            )}
            {contactData.email && (
              <p className="text-xl">{contactData.email}</p>
            )}
          </div>
        </div>

        {/* Right side with contact form */}
        <div className="flex-shrink-0 w-80 md:mr-[100px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2">
                {t("first_name")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("enter_first_name")}
                className="w-full px-4 py-3 bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-2">
                {t("last_name")}
              </label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder={t("enter_last_name")}
                className="w-full px-4 py-3 bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-2">
                {t("phone_number")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nömrənizi daxil edin"
                className="w-full px-4 py-3 bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-2">
                {t("contactDetails.note")}
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder={t("contactDetails.enter_note")}
                className="w-full px-4 py-3 bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white min-h-[100px]"
                rows={4}
              />
            </div>

            {submitMessage && (
              <div
                className={`text-sm ${
                  submitMessage.isError ? "text-red-400" : "text-green-400"
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-black text-white py-3 px-6 mt-6 hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? t("sending") : t("send")}</span>
              {!isSubmitting && (
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1668 1.3335L10.5002 14.6668L7.8335 8.66683M15.1668 1.3335L1.8335 6.00016L7.8335 8.66683M15.1668 1.3335L7.8335 8.66683"
                    stroke="#FAFAFA"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactBanner;

"use client"

import { postContactForm } from "@/pages/api/services/postContactForm"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export interface ContactFormResponse {
  success: boolean
  message?: string
}

interface ContactBannerProps {
  contactData?: {
    phone: string
    email: string
    map: string
  } | null
}

function ContactBanner({ contactData }: ContactBannerProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    note: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{
    text: string
    isError: boolean
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await postContactForm(formData)
      if (response) {
        setSubmitMessage({
          text: t("contact_success"),
          isError: false,
        })
        setFormData({ name: "", surname: "", phone: "", note: "" })
      } else {
        setSubmitMessage({
          text: t("contact_error_send"),
          isError: true,
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitMessage({
        text: t("error_try_again"),
        isError: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!contactData) {
    return <p className="p-8 text-center text-white">{t("no_contact_info")}</p>
  }

  return (
    <div className="bg-[#6B7B6E] min-h-[500px] relative p-8 md:p-20  ">
      <div className="absolute top-0 right-0 hidden md:block z-10">
        <Image
          width={250}
          height={190}
          src="/images/icons/lamp.png"
          alt="Lamp"
          className="w-[120px] h-[190px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-10 md:gap-0 lg:flex-row h-full">
        {/* Map Section */}
        <div className="flex-1 lg:w-1/2 justify-center">
          <iframe
            src={contactData?.map || ""}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        <div className="flex-1 lg:w-1/2  flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-8 font-archivo">
              {t("how_can_we_help")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white text-sm mb-2 font-archivo">{t("first_name")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("enter_first_name")}
                  className="w-full px-4 py-3 bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white font-archivo"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-archivo">{t("last_name")}</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder={t("enter_last_name")}
                  className="w-full px-4 py-3 bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white font-archivo"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-archivo">{t("phone_number")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("enter_phone_number")}
                  className="w-full px-4 py-3 bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white font-archivo"
                  required
                />
              </div>

              {submitMessage && (
                <div className={`text-sm font-archivo ${submitMessage.isError ? "text-red-400" : "text-green-400"}`}>
                  {submitMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-6 hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-archivo"
              >
                <span>{isSubmitting ? t("sending") : t("send")}</span>
                {!isSubmitting && (
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

            <div className="mt-8 space-y-3">
              {contactData.phone && (
                <div className="flex items-center text-white font-archivo">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-3">
                    <path
                      d="M14.5 11.2v1.8c0 .8-.7 1.5-1.5 1.5-6.6 0-12-5.4-12-12C1 1.7 1.7 1 2.5 1h1.8c.3 0 .6.2.7.5l1 2.4c.1.3 0 .6-.2.8L4.5 6c.9 1.8 2.7 2.6 4.5 3.5l1.3-1.3c.2-.2.5-.3.8-.2l2.4 1c.3.1.5.4.5.7z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  <Link href={`tel:${contactData.phone}`} className="hover:underline">{contactData.phone}</Link>
                </div>
              )}
              {contactData.email && (
                <div className="flex items-center text-white font-archivo">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-3">
                    <path
                      d="M2.5 4.5h11c.8 0 1.5.7 1.5 1.5v6c0 .8-.7 1.5-1.5 1.5h-11C1.7 13.5 1 12.8 1 12V6c0-.8.7-1.5 1.5-1.5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M15 6L8 10.5 1 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Link href={`mailto:${contactData.email}`} className="hover:underline">{contactData.email}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactBanner
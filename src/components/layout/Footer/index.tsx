import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className=" px-4 py-8 mt-14 border-t border-elements font-archivo w-full">
      <div className="flex  flex-col md:flex-row justify-between">
        <div className="flex flex-col pb-5">
          <div className="w-full mb-4">
            <Image
              src="/images/logo/logo-elita2.png"
              alt="Elita Logo"
              width={128}
              height={32}
              className="w-[140px] h-auto"
            />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-elements text-2xl transform transition-transform transition-colors duration-300 ease-in-out hover:scale-110 hover:text-[#E1306C]"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-elements text-2xl transform transition-transform transition-colors duration-300 ease-in-out hover:scale-110 hover:text-[#1877F2]"
            >
              <FaFacebook />
            </a>

            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-elements text-2xl transform transition-transform transition-colors duration-300 ease-in-out hover:scale-110 hover:text-[#1DA1F2]"
            >
              <FaTwitter />
            </a>

            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-elements text-2xl transform transition-transform transition-colors duration-300 ease-in-out hover:scale-110 hover:text-[#0077B5]"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Fixed grid with equal column widths */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-6 flex-1 max-w-4xl">
          {/* Dizayn Column */}
          <div className="flex flex-col space-y-2 min-w-0">
            <h3 className="font-normal text-textBase text-base">
              {t("contactDetails.site_map")}  
            </h3>
            <ul className="flex flex-col space-y-3">
              <li>
              <Link href="/"
                 
                  className="text-elementSecondary  hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/haqqimizda"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/elaqe"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Temir ve tikinti Column */}
          <div className="flex flex-col space-y-2 min-w-0">
            <h3 className="font-normal text-textBase text-base">
              {t("contactDetails.services")}
            </h3>
            <ul className="flex flex-col space-y-3">
              <li>
                <Link
                  href="/dizayn"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.design")}
                </Link>
              </li>
              <li>
                <Link
                  href="/temir"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.repair_construction")}
                </Link>
              </li>
              <li>
                <Link
                  href="/mebel"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.furniture")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hamam"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.bath_accessories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Mebel Column */}
          <div className="flex flex-col space-y-2 min-w-0">
            <h3 className="font-normal text-textBase text-base">
              {" "}
              {t("contactDetails.elita_group")}
            </h3>
            <ul className="flex flex-col space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                    {t("contactDetails.address")}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.phone")}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-elementSecondary hover:text-secondary text-sm transition-colors"
                >
                  {t("contactDetails.mail")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

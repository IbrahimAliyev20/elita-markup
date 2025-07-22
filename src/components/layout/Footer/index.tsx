import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "../Container";

// Qeyd: react-i18next və react-icons importları istifadə edilmədiyi üçün silindi.
// Lazım gələrsə, yenidən əlavə edə bilərsiniz.

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#545C56] text-white pt-12 pb-8">
      <Container>
        {/* Yuxarıdakı ayırıcı xətt */}
        <div className="border-t border-white/20"></div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 py-12">
          {/* Logo Column */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo/logo-elita2.png" 
              alt="Elita Group Logo"
              width={120}
              height={40}
              className="w-[120px] h-auto brightness-0 invert"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base mb-6">Dizayn</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dizayn"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Layihələr
                </Link>
              </li>
              <li>
                <Link
                  href="/dizayn"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Xidmətlər
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              Təmir və tikinti
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/temir"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Layihələr
                </Link>
              </li>
              <li>
                <Link
                  href="/temir"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Xidmətlər
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">Mebel</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mebel"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Layihələr
                </Link>
              </li>
              <li>
                <Link
                  href="/mebel"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Xidmətlər
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              Hamam aksesuarları
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/hamam"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Layihələr
                </Link>
              </li>
              <li>
                <Link
                  href="/hamam"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Xidmətlər
                </Link>
              </li>
               <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">Elita</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/haqqimizda"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Haqqımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/elaqe"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Əlaqə
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              © Copyright 2025 | Bütün hüquqlar qorunur.
            </div>
            <div className="text-center md:text-right">
              <Link
                href="https://markup.az/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Markup tərəfindən hazırlanıb.
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
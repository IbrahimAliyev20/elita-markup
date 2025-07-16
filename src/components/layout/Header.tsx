import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Container from "./Container";

function Header({ activeItem = "" }) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const menuIconRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: "dizayn", label: t("design"), href: "/dizayn" },
    { id: "temir", label: t("repair_construction"), href: "/temir" },
    { id: "mebel", label: t("furniture"), href: "/mebel" },
    { id: "hamam", label: t("bath_accessories"), href: "/hamam" },
  ];

  const dropdownItems = [
    { id: "about", label: t("about"), href: "/haqqimizda" },
    { id: "contact", label: t("contact"), href: "/elaqe" },
    { id: "blog", label: "Bloq", href: "/blog" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSidebarOpen = () => {
    setIsMenuOpen(true);
    // Add a small delay to ensure the component is mounted before triggering the transition
    setTimeout(() => {
      setIsSidebarVisible(true);
    }, 50); // Small delay for smooth opening
  };

  const handleSidebarClose = () => {
    setIsSidebarVisible(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 400); // Increased from 300ms to 400ms for smoother transition
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white font-archivo ">
        <Container>
          <div className="hidden md:flex justify-between w-full py-3">
            <div>
              <Link href="/">
                <Image
                className="w-[110px]"
                  src="/images/logo/logo-elita2.png"
                  width={90}
                  height={20}
                  quality={100}
                  alt="Elita Logo"
                />
              </Link>
            </div>

            <div className="flex gap-4 lg:gap-8 font-archivo">
              {menuItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <Link href={item.href}>
                    {activeItem === item.id ? (
                      <div className="flex items-center gap-1 underline decoration-[1px] underline-offset-8 decoration-amber-700 cursor-pointer">
                        <RxDotFilled className="text-amber-700 text-2xl" />
                        <span className="text-textBase text-lg">{item.label}</span>
                      </div>
                    ) : (
                      <span className="text-textBase text-lg transition-colors duration-300 cursor-pointer hover:text-amber-700">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </div>
              ))}

              <div className="flex items-center">
                <span className="text-textBase text-lg cursor-pointer transition-colors duration-300 hover:text-amber-700">
                  <LanguageSwitcher />
                </span>
              </div>

              <div className="relative group">
                <div
                  ref={menuIconRef}
                  className="flex items-center h-full cursor-pointer"
                  onClick={handleSidebarOpen}
                  onMouseEnter={handleSidebarOpen}
                >
                  <AiOutlineMenu className="text-textBase text-lg transition-colors duration-300 hover:text-amber-700" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden justify-between items-center w-full py-3 px-4">
            <div>
              <Image
                src="/images/logo/logo-elita2.png"
                width={70}
                height={15}
                quality={100}
                alt="Elita Logo"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex ">
                <span className="text-textBase text-xl cursor-pointer transition-colors duration-300 hover:text-amber-700">
                  <LanguageSwitcher />
                </span>
              </div>
              <button
                className="mobile-menu-button focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <AiOutlineClose className="text-textBase text-2xl" />
                ) : (
                  <AiOutlineMenu className="text-textBase text-2xl" />
                )}
              </button>
            </div>
          </div>

          <div
            ref={mobileMenuRef}
            className={`md:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between p-4">
              <div>
                <Image
                  src="/images/logo/logo-elita2.png"
                  width={90}
                  height={20}
                  quality={100}
                  alt="Elita Logo"
                />
              </div>
              <button
                className="focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <AiOutlineClose className="text-textBase text-2xl" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-6 mt-10">
              {menuItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <Link href={item.href}>
                    {activeItem === item.id ? (
                      <div className="flex items-center gap-1 underline decoration-[1px] underline-offset-8 decoration-amber-700 cursor-pointer">
                        <RxDotFilled className="text-amber-700 text-2xl" />
                        <span className="text-textBase text-xl">{item.label}</span>
                      </div>
                    ) : (
                      <span className="text-textBase text-xl transition-colors duration-300 cursor-pointer hover:text-amber-700">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </div>
              ))}

              <div className="border-t border-gray-200 w-4/5 pt-6 mt-6">
                <div className="flex flex-col items-center gap-6">
                  {dropdownItems.map((item) => (
                    <Link key={item.id} href={item.href}>
                      <p
                        className="text-textBase text-xl hover:text-amber-700 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Desktop Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-all duration-500 ease-out ${
              isSidebarVisible ? "opacity-50" : "opacity-0"
            }`}
            onClick={handleSidebarClose}
          />

          {/* Sidebar content */}
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 font-archivo">
            <div
              className={`relative w-screen max-w-[300px] transform transition-all duration-500 ease-out ${
                isSidebarVisible ? "translate-x-0" : "translate-x-full"
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="flex h-full flex-col bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-5 border-b border-neutral-200">
                  <h2 className="text-lg text-neutral-800">{t("menu")}</h2>
                  <button 
                    onClick={handleSidebarClose}
                    className="p-1 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                  >
                    <IoClose className="h-6 w-6" />
                  </button>
                </div>

                {/* Menu items */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <div className="space-y-2">
                    {dropdownItems.map((item) => (
                      <Link key={item.id} href={item.href}>
                        <div
                          className="block px-4 py-3 text-textBase text-lg hover:bg-amber-50 hover:text-amber-700 transition-all duration-200 ease-in-out rounded-md cursor-pointer transform hover:scale-[1.02]"
                          onClick={handleSidebarClose}
                        >
                          {item.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
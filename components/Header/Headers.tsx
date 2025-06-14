"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll } from "@/components/Provider/ScrollContent";
import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";
import Image from "next/image";
import ModalAuth from "@/components/Auth/ModalAuth";
import UserMenu from "./Combobox/UserMenu";
import ModalTabs from "../Provider/ModalTabs";
import Plan from "./Combobox/Upgrade/Plan";
import GetPlan from "./Combobox/Upgrade/GetPlan";
import Info from "./Combobox/Upgrade/Info";
import { ModalTabsSharedData } from "../Provider/ModalTabsContext";
import Login from "../Auth/Login/Login";
import { useAuth } from "../Provider/AuthWrapper";
import Spinner from "../Loading/Spinner";
import AppsMenu from "./Combobox/AppsMenu";

const Headers = () => {
  const { isScrolledPast } = useScroll();
  const headers = isScrolledPast(3);
  const { isLoggedIn, user, loading, refreshUser } = useAuth();

  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  const userButtonRef = useRef<HTMLButtonElement>(null);
  const appsButtonRef = useRef<HTMLButtonElement>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const appsMenuRef = useRef<HTMLDivElement>(null);

  const [activeModalTabIndex, setActiveModalTabIndex] = useState(0);
  const [sharedData, setSharedData] = useState<ModalTabsSharedData>({});

  const closeAllMenus = () => {
    setIsUserOpen(false);
    setIsAppsOpen(false);
    setShowModal(false);
    setShowModalLogin(false);
  };

  useEffect(() => {
    if (!headers) {
      closeAllMenus();
    }
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        isUserOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(target) &&
        !userButtonRef.current?.contains(target)
      )
        setIsUserOpen(false);
      if (
        isAppsOpen &&
        appsMenuRef.current &&
        !appsMenuRef.current.contains(target) &&
        !appsButtonRef.current?.contains(target)
      )
        setIsAppsOpen(false);
      console.log("user", isAppsOpen);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserOpen, isAppsOpen, headers]);

  if (loading) return <Spinner />;
  return (
    <>
      <header
        className={`fixed w-100 z-1500 p-06 b-black-opacity-low flex-center jus-between border-b-custom backdrop-7 shadow-white opacity-0 transformY-min-100 trans-fransform-opacity-03 ${
          headers ? "transformY-0 opacity-1" : ""
        }`}
      >
        <Link
          href={"/"}
          className="c-hover-white relative merienda fw-700 m-l-2-3 trans-color-03 md-m-l-2 md-fs-09 logohead"
        >
          {isLoggedIn ? <h2>{user?.role}</h2> : <h2>Naliverse</h2>}
        </Link>
        <div className="flex-center gap-1">
          <button
            className="fs-1-06 c-hover-white trans-color-03"
            ref={appsButtonRef}
            onClick={() => {
              setIsUserOpen(false);
              setIsAppsOpen(!isAppsOpen);
              setShowModal(false);
              setShowModalLogin(false);
            }}
          >
            <RiDashboardFill />
          </button>
          {isLoggedIn ? (
            <button
              className="w-35px h-35px radius-curcle ovenflow-hidden"
              ref={userButtonRef}
              onClick={() => {
                setIsUserOpen(!isUserOpen);
                setIsAppsOpen(false);
                setShowModal(false);
                setShowModalLogin(false);
              }}
            >
              <Image
                src="/naliverse/user.webp"
                alt="Profile"
                width={100}
                height={100}
                className="w-100 h-100-persen object-c"
                quality={100}
              />
            </button>
          ) : (
            <button
              className="w-35px h-35px radius-curcle ovenflow-hidden"
              ref={userButtonRef}
              onClick={() => {
                setIsUserOpen(false);
                setIsAppsOpen(false);
                setShowModal(false);
                setShowModalLogin(true);
              }}
            >
              <Image
                src="/naliverse/user.webp"
                alt="Profile"
                width={100}
                height={100}
                className="w-100 h-100-persen object-c"
                quality={100}
              />
            </button>
          )}
          {/* AppMenu */}
          <div
            ref={appsMenuRef}
            className={`absolute top-100 right-0 z-1100 transformScale-03 opacity-0 pointer-none transformOrigin-t-r trans-fransform-opacity-03 visibility-none ${
              isAppsOpen
                ? "visibility-visible pointer-auto opacity-1 transformScale-1"
                : ""
            }`}
          >
            <AppsMenu onClose={() => setIsAppsOpen(false)} />
          </div>
          <div
            ref={userMenuRef}
            className={`absolute top-100 right-0 z-1100 transformScale-03 opacity-0 pointer-none transformOrigin-t-r trans-fransform-opacity-03 visibility-none ${
              isUserOpen
                ? "visibility-visible pointer-auto opacity-1 transformScale-1"
                : ""
            }`}
          >
            <UserMenu
              onClose={() => setIsUserOpen(false)}
              setShowModal={setShowModal}
              setActiveModalTabIndex={setActiveModalTabIndex}
              onLogoutSuccess={async () => {
                await refreshUser();
                setShowModalLogin(false);
              }}
            />
          </div>
        </div>
        <ModalAuth
          show={showModalLogin}
          onClose={() => setShowModalLogin(false)}
        >
          <Login
            onLoginSuccess={async () => {
              await refreshUser();
              setShowModalLogin(false);
            }}
          />
        </ModalAuth>
        <ModalTabs
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setSharedData({});
          }}
          tabs={["Price", "Get", "Info"]}
          externalIndex={activeModalTabIndex}
          onTabChange={setActiveModalTabIndex}
          sharedData={sharedData}
          setSharedData={setSharedData}
          contents={[
            <Plan key="Plan" updateSharedData={setSharedData} />,
            <GetPlan key="GetPlan" sharedData={sharedData} />,
            <Info key="Info" sharedData={sharedData} />,
          ]}
        />
      </header>
    </>
  );
};
export default Headers;

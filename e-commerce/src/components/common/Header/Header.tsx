import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import Logo from "@assets/store-icon.svg?react";
import HeaderBasket from "@components/eCommerce/HeaderBasket/HeaderBasket";
import HeaderWishlist from "@components/eCommerce/HeaderWishlist/HeaderWishlist";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import actGetWishlist from "@store/wishlist/actGetWishlist";
import { authLogout } from "@store/auth/authSlice";
const navigation = [
  { name: "Home", to: "/" },
  { name: "Categories", to: "/categories" },
  { name: "Products", to: "/products" },
];

const Header = () => {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductIds"));
    }
  }, [dispatch, accessToken]);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="xl:mx-auto max-w-full px-2 sm:px-6 xl:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Logo className="w-8" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }: { isActive: boolean }) =>
                          isActive
                            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                {!accessToken ? (
                  <>
                    <Link to="login" className="text-slate-50 mr-2">
                      Login
                    </Link>
                    <Link to="signup" className="text-slate-50">
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      className="text-slate-50"
                      onClick={() => dispatch(authLogout())}
                    >
                      Logout
                    </Link>
                  </>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 text-slate-50 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <HeaderWishlist />
              </div>
              <div className="absolute inset-y-0 right-0 text-slate-50 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                <HeaderBasket />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;

/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { FC } from "react";

import { toast } from "react-toastify";
import { Dialog, Switch } from "@headlessui/react";
import cn from "classnames";

import { useModal } from "services/hooks/useModal";
import { useTheme } from "services/hooks/useTheme";

import Counter from "views/pages/example/Counter";
import MovieView from "views/pages/example/MovieView";

const ExamplePage: FC = () => {
  /**
   * ? Define orders:
   * ? 1. redux definition
   * ? 2. react definition
   * ? 3. third party libraries definition
   * ? 4. libs, services, data definition
   * ? 5. helpers, util definition
   * ? 6. local definition
   */
  const { openModal, closeModal } = useModal();
  const { isDark, toggleTheme } = useTheme();

  const notify = () =>
    toast("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    /**
     * ? Props and attribute orders
     * ? 1. key
     * ? 2. type
     * ? 3. value
     * ? 4. props
     * ? 5. className
     * ? 6. styles
     * ? 7. events handle
     */
    <div className="flex flex-col justify-center items-center min-h-screen dark:bg-accent-gray px-10 py-5">
      <h1 className="text-5xl dark:text-primary-light">Hello Tailwind 👋</h1>

      <button
        className="p-4 bg-positive rounded-lg font-bold text-primary-light mt-5 hover:bg-primary-gray"
        onClick={notify}
      >
        Toaster 🚀
      </button>

      <button
        className="p-4 bg-positive rounded-lg font-bold text-primary-light mt-5 hover:bg-primary-gray"
        onClick={() =>
          openModal(
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-accent-gray"
              >
                Payment successful
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-primary-gray">
                  Your payment has been successfully submitted. We’ve sent your
                  an email with all of the details of your order.
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-secondary bg-accent-light border border-transparent rounded-md hover:bg-secondary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          )
        }
      >
        Open Modal
      </button>

      <div className="py-16">
        <Switch
          checked={isDark}
          className={cn(
            "relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-primary-light focus-visible:ring-opacity-75",
            {
              "bg-warning": isDark,
              "bg-negative": !isDark,
            }
          )}
          onChange={(value: boolean) => toggleTheme(value ? "dark" : "light")}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${isDark ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-primary-light shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>

        <Counter />

        <MovieView />
      </div>
    </div>
  );
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
export default ExamplePage;

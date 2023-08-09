import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import BarChart from "../../../components/barchart";
import Table from "../../../components/table";
import axios from "axios";

const Simulation = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [code, setCode] = useState("");
  let [amount, setAmount] = useState("");
  let [budgets, setBudgets] = useState([]);
  let [simulations, setSimulations] = useState([]);

  useEffect(() => {
    getBudgets();
    getSimulations();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function submitData(e) {
    e.preventDefault();
    let data = {
      code,
      amount,
    };

    try {
      const res = await axios.post("http://localhost:4000/api/simulate", data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBudgets() {
    try {
      const res = await axios.get("http://localhost:4000/api/budget");

      console.log(res.data.budgets);
      setBudgets(res.data.budgets);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSimulations() {
    try {
      const res = await axios.get("http://localhost:4000/api/simulate");

      setSimulations(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <button
          onClick={openModal}
          title="Contact Sale"
          class="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full 
        drop-shadow-lg flex justify-center items-center text-white text-4xl 
        hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 p-2"
                  >
                    Simulate
                  </Dialog.Title>
                  <hr className="p-2" />
                  <div className="mt-2">
                    <form onSubmit={submitData}>
                      <div class="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          for="username"
                        >
                          Code
                        </label>
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          required
                          className="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="text"
                          placeholder="eg - 2021-01-jzSRlp"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="username"
                        >
                          Amount
                        </label>
                        <input
                          value={amount}
                          required
                          onChange={(e) => setAmount(e.target.value)}
                          class="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="number"
                          placeholder="$68000"
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          // onClick={closeModal}
                        >
                          submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Table budgets={budgets} />

      <div className="p-4">
        <div>Successful Simulations</div>

        <div class="p-6 shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  S/N
                </th>
                <th scope="col" class="px-6 py-3">
                  code
                </th>
                <th scope="col" class="px-6 py-3">
                  amount
                </th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((simulation, i) => (
                <tr
                  key={simulation._id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td class="px-6 py-4">{i + 1}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {simulation.code}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {simulation.amount}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Simulation;

import React from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import BarChart from "../../../components/barchart";
import Table from "../../../components/table";
import axios from "axios";

const Dashboard = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [type, setType] = useState("expense");
  let [year, setYear] = useState("");
  let [semester, setSemester] = useState("first");
  let [name, setName] = useState("");
  let [amount, setAmount] = useState("");
  let [category, setCategory] = useState("administrative");
  let [budgets, setBudgets] = useState([]);

  useEffect(() => {
    getBudgets();
    aggregate();
  }, []);

  async function aggregate() {
    try {
      const res = await axios.get("http://localhost:4000/api/budget");

      const budget = res.data.budgets;
      let newOne = budget.map((el) => {
        let actual;
        if (el.actual.length > 1) {
          actual = el.actual.reduce(function (a, b) {
            return a.amount + (b.amount || 0);
          });
        }
        if (el.actual.length == 1) {
          actual = el.actual[0].amount;
        }
        if (el.actual.length == 0) actual = 0;
        return {
          ...el,
          actual,
        };
      });
      console.log(budget);
      console.log(newOne);
      main(newOne);
    } catch (error) {
      console.log(error);
    }
  }

  function main(arr) {
    const array = [];
    const mainArr = [];

    arr.forEach((e) => {
      if (!array.includes(e.session)) {
        array.push(e.session);
      }
    });
    console.log(array);

    array.forEach((e) => {
      let expense = 0;
      let income = 0;
      let actual;
      arr.forEach((el) => {
        actual = el.actual;
        if (e === el.session) {
          if (el.type === "income") {
            income += el.amount;
          } else {
            expense += el.amount;
          }
        }
      });
      mainArr.push({ session: e, income, expense, actual });
    });
    console.log(mainArr);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handleSemesterChange(e) {
    setSemester(e.target.value);
  }

  async function submitData(e) {
    e.preventDefault();
    let data = {
      type,
      year,
      name,
      amount,
      category,
      semester,
    };

    try {
      const res = await axios.post("http://localhost:4000/api/budget", data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBudgets() {
    try {
      const res = await axios.get("http://localhost:4000/api/budget");

      setBudgets(res.data.budgets);
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

      <div className="p-6 grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <BarChart />
        </div>
        <div className="flex flex-center m-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Total Expected
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Actualized
                </th>
                <th scope="col" class="px-6 py-3">
                  Net
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">500</td>
                <td>500</td>
                <td>+500</td>
              </tr>
            </tbody>
          </table>
        </div>
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
                    Add Budget
                  </Dialog.Title>
                  <hr className="p-2" />
                  <div className="mt-2">
                    <form onSubmit={submitData}>
                      <div class="mb-4">
                        <label
                          for="countries"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Budget type
                        </label>
                        <select
                          id="countries"
                          value={type}
                          onChange={handleTypeChange}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="expense">expense</option>
                          <option value="income">income</option>
                        </select>
                      </div>
                      <div class="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          for="username"
                        >
                          Year
                        </label>
                        <input
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          required
                          className="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="number"
                          placeholder="eg - 2021"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                          Semester
                        </label>
                        <select
                          value={semester}
                          onChange={handleSemesterChange}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="first">first</option>
                          <option value="second">second</option>
                        </select>
                      </div>
                      <div class="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          for="username"
                        >
                          Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="text"
                          placeholder="eg - school fees"
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
                      <div class="mb-4">
                        <label
                          for="countries"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          category
                        </label>
                        <select
                          value={category}
                          onChange={handleCategoryChange}
                          id="countries"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                         dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="administrative">administrative</option>
                          <option value="academic">academic</option>
                        </select>
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

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Table budgets={budgets} />
    </>
  );
};

export default Dashboard;

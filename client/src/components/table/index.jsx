import React from "react";

const Table = ({ budgets }) => {
  return (
    <>
      <div class="p-6 shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                S/N
              </th>
              <th scope="col" class="px-6 py-3">
                name
              </th>
              <th scope="col" class="px-6 py-3">
                code
              </th>
              <th scope="col" class="px-6 py-3">
                amount
              </th>
              <th scope="col" class="px-6 py-3">
                Year(Semester)
              </th>
              <th scope="col" class="px-6 py-3">
                type
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, i) => (
              <tr
                key={budget.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="px-6 py-4">{i + 1}</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {budget.name}
                </th>
                <td class="px-6 py-4">{budget.code}</td>
                <td class="px-6 py-4">${budget.amount}</td>
                <td class="px-6 py-4">
                  {budget.session} ({budget.semester})
                </td>
                <td class="px-6 py-4">{budget.type}</td>
                <td class="px-6 py-4">{budget.category}</td>
                <td class="px-6 py-4">
                  <a
                    href="/"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  &nbsp;
                  <a
                    href="/"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;

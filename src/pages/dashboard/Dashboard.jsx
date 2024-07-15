import React from 'react'

export default function Dashboard() {
  return (
    <main className="flex flex-col min-h-[85vh] py-10 px-4 bg-primary">
      <div className="relative rounded-lg shad grid grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-4 text-main/80">
        <aside className="flex flex-col gap-3 items-center justify-center bg-primary rounded-md m-4 p-4 border-2 border-slate-200">
          <h3 className="text-2xl lg:text-4xl font-bold">24</h3>
          <h3 className="text-xl lg:text-2xl font-medium opacity-70">Total Listing</h3>
        </aside>
        <aside className="flex flex-col gap-3 items-center justify-center bg-primary rounded-md m-4 p-4 border-2 border-slate-200">
          <h3 className="text-2xl lg:text-4xl font-bold">16</h3>
          <h3 className="text-xl lg:text-2xl font-medium opacity-70">Total Users</h3>
        </aside>
        <aside className="flex flex-col gap-3 items-center justify-center bg-primary rounded-md m-4 p-4 border-2 border-slate-200">
          <h3 className="text-2xl lg:text-4xl font-bold">29</h3>
          <h3 className="text-xl lg:text-2xl font-medium opacity-70">Total Transactions</h3>
        </aside>
      </div>
    </main>
  )
}

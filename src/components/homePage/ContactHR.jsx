import React from 'react'

function ContactHR() {
  return (
    <div>
      <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
          <h2 className="text-gray-500 text-lg font-semibold pb-1">Absences</h2>
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
          <canvas id="usersChart"></canvas>
        </div>
        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
          <h2 className="text-gray-500 text-lg font-semibold pb-1">Paychecks</h2>
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
          <canvas id="commercesChart"></canvas>
        </div>
      </div>
    </div>
  )
}

export default ContactHR
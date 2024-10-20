const Dashboard = () => {
  return (
    <div className="h-screen p-6 space-y-6 overflow-y-auto custom-scrollbar">  {/* Added custom-scrollbar class */}
      {/* DASHBOARD Header */}
      <h1 className="text-2xl font-bold text-gray-800">DASHBOARD</h1>  {/* Added text for DASHBOARD */}

      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p className="text-gray-600">New Candidates</p>
          <h1 className="text-3xl font-bold text-orange-500">234</h1>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p className="text-gray-600">Upcoming Interviews</p>
          <h1 className="text-3xl font-bold text-orange-500">08</h1>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p className="text-gray-600">Selected Candidates</p>
          <h1 className="text-3xl font-bold text-orange-500">167</h1>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Applications Line Chart */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Total Applications</h2>
          {/* Line Chart Placeholder */}
          <div className="mt-4 h-48 flex items-center justify-center bg-orange-50 rounded-lg">
            <p className="text-gray-500">[Line Chart]</p>
          </div>
        </div>

        {/* Submitted Applications Donut Chart */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Submitted Applications</h2>
          {/* Donut Chart Placeholder */}
          <div className="mt-4 h-48 flex items-center justify-center bg-orange-50 rounded-full">
            <p className="text-gray-500">80% Submitted</p>
          </div>
          <div className="mt-4 flex justify-around">
            <div className="flex items-center">
              <span className="h-4 w-4 bg-blue-500 rounded-full inline-block mr-2"></span>
              Provider1
            </div>
            <div className="flex items-center">
              <span className="h-4 w-4 bg-orange-500 rounded-full inline-block mr-2"></span>
              Provider2
            </div>
            <div className="flex items-center">
              <span className="h-4 w-4 bg-black rounded-full inline-block mr-2"></span>
              Provider3
            </div>
          </div>
        </div>
      </div>

      {/* Top Applications & Applications Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Applications */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Top Applications</h2>
          <ul className="mt-4 space-y-2">
            {[{ name: "Sohaib Muhammad", email: "sobaib_muh@gmail.com", location: "Pak", stack: "Full Stack", percentage: "94%" },
              { name: "Amer Ahmed", email: "amer_ahmed@gmail.com", location: "Pak", stack: "Full Stack", percentage: "88%" },
              { name: "Sheik Anas", email: "sheik_2024@gmail.com", location: "Egy", stack: "Full Stack", percentage: "86%" },
              { name: "Hazin Zaf Amir", email: "hazinzafo101@gmail.com", location: "Ban", stack: "Full Stack", percentage: "78%" },
              { name: "Nafissa Begum", email: "nafissa94@gmail.com", location: "Ind", stack: "Full Stack", percentage: "67%" }]
              .map((applicant, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold">{applicant.name}</span>
                  <span className="text-gray-500">{applicant.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">{applicant.location}</span>
                  <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg">{applicant.stack}</span>
                  <span className="text-green-500 font-bold">{applicant.percentage}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Applications Tracker */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Applications Tracker</h2>
          <ul className="mt-4 space-y-2">
            {[{ month: "Jan", value: 23400 },
              { month: "Feb", value: 15000 },
              { month: "Mar", value: 30000 },
              { month: "Apr", value: 22000 },
              { month: "May", value: 10000 },
              { month: "Jun", value: 23400 },
              { month: "Jul", value: 5000 }]
              .map((tracker, index) => (
              <li key={index}>
                <p className="text-gray-600">{tracker.month}</p>
                <div className="w-full bg-gray-200 h-2 rounded-lg mt-1">
                  <div
                    className="bg-orange-500 h-2 rounded-lg"
                    style={{ width: `${(tracker.value / 30000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{tracker.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
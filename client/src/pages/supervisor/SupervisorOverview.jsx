import React from "react";
import { useSupervisorDashboard } from "./SupervisorDashboardContext";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const SupervisorOverview = () => {
  const { data } = useSupervisorDashboard();
  const totalStudents = data.students.length;
  const avgProgress =
    totalStudents === 0
      ? 0
      : Math.round(
          data.students.reduce((sum, s) => sum + s.progress, 0) / totalStudents
        );

  const chartData = {
    labels: ["Average Progress", "Remaining"],
    datasets: [
      {
        data: [avgProgress, 100 - avgProgress],
        backgroundColor: ["#36A2EB", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center animate-fadein">
          <h2 className="text-xl font-semibold mb-2">
            Average Student Progress
          </h2>
          <div className="w-40 h-40">
            <Doughnut data={chartData} />
          </div>
          <div className="mt-2 text-lg">{avgProgress}%</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 animate-fadein">
          <h2 className="text-xl font-semibold mb-2">Students Supervised</h2>
          <div className="text-4xl font-bold">{totalStudents}</div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 animate-fadein">
        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        <ul className="divide-y">
          {data.reviews.slice(0, 3).map((r, idx) => {
            const student = data.students.find((s) => s.id === r.studentId);
            return (
              <li key={idx} className="py-2 flex justify-between items-center">
                <span>
                  <span className="font-medium">
                    {student?.name || "Unknown"}:
                  </span>{" "}
                  {r.text}
                </span>
                <span className="text-gray-400 text-sm">{r.date}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow p-6 animate-fadein">
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <ul className="divide-y">
          {data.reports.slice(0, 3).map((report, idx) => (
            <li key={idx} className="py-2 flex justify-between items-center">
              <span>
                <span className="font-medium">{report.title}</span> (
                {report.type})
              </span>
              <span className="text-gray-400 text-sm">{report.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SupervisorOverview;

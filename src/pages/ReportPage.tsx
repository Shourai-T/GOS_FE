import React from "react";
import DistributionChart from "../components/DistributionChart";
import TopStudentsTable from "../components/TopStudentsTable";

const ReportPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900">Báo Cáo Thống Kê</h1>
        <p className="mt-2 text-gray-600">
          Tổng hợp phân tích phổ điểm và danh sách thí sinh xuất sắc
        </p>
      </div>

      <div className="space-y-8">
        <DistributionChart />
        <TopStudentsTable />
      </div>
    </div>
  );
};

export default ReportPage;

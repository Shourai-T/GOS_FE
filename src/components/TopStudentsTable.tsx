import React from "react";
import { Loader2, Medal, Trophy } from "lucide-react";
import { useTopStudents } from "../hooks/useStudentData";

const TopStudentsTable: React.FC = () => {
  const { students, loading, error } = useTopStudents();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 flex justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 flex justify-center text-red-500 font-medium">
        ⚠️ {error}
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />;
      default:
        return (
          <span className="font-bold text-gray-500 w-5 text-center">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-bold text-gray-800">
          Top 10 Khối A (Toán - Lý - Hóa)
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Top 10 students in Group A ranked by total score
          </caption>
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                SBD
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Tổng Điểm
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Toán
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Vật Lý
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Hóa Học
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr
                key={student.sbd}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3 font-medium text-gray-900 flex items-center justify-center">
                  {getRankIcon(student.rank)}
                </td>
                <td className="px-6 py-3 font-mono text-gray-600">
                  {student.sbd}
                </td>
                <td className="px-6 py-3 text-right font-bold text-blue-600">
                  {student.group_a_score}
                </td>
                <td className="px-6 py-3 text-right">{student.scores.toan}</td>
                <td className="px-6 py-3 text-right">
                  {student.scores.vat_li}
                </td>
                <td className="px-6 py-3 text-right">
                  {student.scores.hoa_hoc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopStudentsTable;

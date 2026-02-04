import React from "react";
import SearchForm from "../components/SearchForm";
import { AlertCircle } from "lucide-react";
import { useStudentSearch } from "../hooks/useStudentData";
import { formatSubjectName } from "../utils/formatters";

const SearchPage: React.FC = () => {
  const { data, error, loading, search } = useStudentSearch();

  const handleSearch = (sbd: string) => {
    search(sbd);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tra Cứu Điểm Thi THPT 2024
        </h1>
        <p className="text-lg text-gray-600">
          Nhập số báo danh để xem chi tiết điểm thi các môn
        </p>
      </div>

      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {error && (
        <div className="max-w-md mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {data && (
        <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Kết Quả Tra Cứu</h2>
            <p className="text-blue-100">SBD: {data.sbd}</p>
          </div>

          <div className="p-6">
            {data.group_a_score && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium">
                  Tổng điểm Khối A
                </p>
                <p className="text-3xl font-bold text-yellow-900">
                  {data.group_a_score}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(data.scores).map(([subject, score]) => (
                <div
                  key={subject}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    {formatSubjectName(subject)}
                  </p>
                  <p className="text-xl font-bold text-gray-900">{score}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

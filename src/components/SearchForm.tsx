import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchFormProps {
  onSearch: (sbd: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [sbd, setSbd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sbd.trim()) {
      setError("Vui lòng nhập số báo danh");
      return;
    }
    if (sbd.length > 20) {
      setError("Số báo danh không hợp lệ");
      return;
    }
    setError("");
    onSearch(sbd);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={sbd}
            onChange={(e) => setSbd(e.target.value)}
            placeholder="Nhập số báo danh (VD: 01000001)"
            maxLength={8}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang tìm...
            </>
          ) : (
            "Tra Cứu"
          )}
        </button>
      </form>
      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default SearchForm;

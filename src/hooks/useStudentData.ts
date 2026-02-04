import { useState, useEffect } from 'react';
import axios from 'axios';
import { studentService } from '../services/studentService';
import type { ChartDataPoint, StudentData, ScoreData, DistributionData } from '../types';

export const useStudentSearch = () => {
  const [data, setData] = useState<ScoreData | undefined>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const search = async (sbd: string) => {
    // ✅ Validate input
    if (!sbd.trim()) {
      setError('Vui lòng nhập số báo danh.');
      return;
    }

    // ✅ Validate SBD format (8 digits)
    const SBD_REGEX = /^\d{8}$/;
    if (!SBD_REGEX.test(sbd.trim())) {
      setError('Số báo danh phải là 8 chữ số.');
      return;
    }

    setLoading(true);
    setError('');
    setData(undefined);

    try {
      const result = await studentService.searchBySbd(sbd);
      setData(result);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('Không tìm thấy thí sinh với số báo danh này.');
        } else {
          setError(err.response?.data?.message || 'Đã có lỗi xảy ra.');
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã có lỗi không xác định.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, search };
};

export const useDistribution = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const rawData: DistributionData = await studentService.getDistribution(controller.signal);
        const chartData: ChartDataPoint[] = Object.values(rawData).map((item) => ({
          name: item.subject_name,
          Giỏi: item.excellent,
          Khá: item.good,
          TB: item.average,
          Yếu: item.weak,
        }));
        setData(chartData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'CanceledError' || err.message === 'canceled') return;
          // console.error('Distribution error:', err);
          setError('Không thể tải dữ liệu phổ điểm. Vui lòng thử lại.');
        } else {
          setError('Không thể tải dữ liệu phổ điểm. Vui lòng thử lại.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
};

export const useTopStudents = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await studentService.getTopGroupA(controller.signal);
        setStudents(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'CanceledError' || err.message === 'canceled') return;
          // console.error('Top students error:', err);
          setError('Không thể tải danh sách thí sinh xuất sắc. Vui lòng thử lại.');
        } else {
          setError('Không thể tải danh sách thí sinh xuất sắc. Vui lòng thử lại.');
        }
      } finally {
        if (!controller.signal.aborted) {
         setLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return { students, loading, error };
};

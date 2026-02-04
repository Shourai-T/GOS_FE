export const formatSubjectName = (key: string): string => {
  const map: Record<string, string> = {
    toan: "Toán",
    ngu_van: "Ngữ Văn",
    ngoai_ngu: "Ngoại Ngữ",
    vat_li: "Vật Lý",
    hoa_hoc: "Hóa Học",
    sinh_hoc: "Sinh Học",
    lich_su: "Lịch Sử",
    dia_li: "Địa Lý",
    gdcd: "GDCD",
  };
  return map[key] || key;
};

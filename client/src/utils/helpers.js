export const getToken = () => localStorage.getItem("token");

export const formatDateForInput = (isoDateString) => {
  if (!isoDateString) return "";
  return new Date(isoDateString).toISOString().split("T")[0];
};

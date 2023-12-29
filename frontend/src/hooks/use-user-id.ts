import { useLocalStorage } from "react-use";

function useUserId() {
  return useLocalStorage("userId");
}

export default useUserId;

import { useState, useCallback } from "react";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

const useSnackbar = () => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const openSnackbar = useCallback(
    (message: string, severity: "success" | "error" | "warning" | "info") => {
      setSnackbarState({ open: true, message, severity });
    },
    []
  );

  const closeSnackbar = useCallback(() => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);

  return {
    snackbarState,
    openSnackbar,
    closeSnackbar,
  };
};

export default useSnackbar;

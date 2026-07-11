import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastOptions } from "react-toastify";

export interface UseActionWithToastOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  redirectOnSuccess?: string;
  redirectDelay?: number;
  toastOptions?: {
    success?: ToastOptions;
    error?: ToastOptions;
  };
}

export function useActionWithToast<Payload = FormData>(
  action: (
    state: FormState,
    payload: Payload
  ) => Promise<FormState> | FormState,
  options?: UseActionWithToastOptions
) {
  const router = useRouter();
  const initialState: FormState = {
    error: null,
    success: null,
  };

  const defaultToastOptions = {
    success: {
      position: "bottom-right" as const,
      autoClose: 3000,
      ...options?.toastOptions?.success,
    },
    error: {
      position: "bottom-right" as const,
      autoClose: 5000,
      ...options?.toastOptions?.error,
    },
  };

  const [state, dispatch, pending] = useActionState(
    async (prevState: FormState, payload: Payload) => {
      const result = await action(prevState, payload);

      if (result.success) {
        toast.success(result.success, defaultToastOptions.success);

        if (options?.onSuccess) {
          options.onSuccess(result.success);
        }

        if (options?.redirectOnSuccess) {
          setTimeout(() => {
            router.push(options.redirectOnSuccess!);
          }, options?.redirectDelay ?? 1500);
        }
      }

      if (result.error) {
        toast.error(result.error, defaultToastOptions.error);

        if (options?.onError) {
          options.onError(result.error);
        }
      }

      return result;
    },
    initialState
  );

  return [state, dispatch, pending] as const;
}

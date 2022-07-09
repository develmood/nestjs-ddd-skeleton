export const successResponse = (data?: unknown): JsonResponse<any> => ({
  status: 'success',
  data: data ?? '',
});

export const failResponse = (data?: unknown): JsonResponse<any> => ({
  status: 'fail',
  data: data ?? '',
})

export const errorResponse = (message?: string): JsonResponse<any> => ({
  status: 'error',
  message: message ?? '',
})

export interface JsonResponse<T> {
  status: 'success' | 'fail' | 'error'
  data?: unknown,
  message?: string,
}

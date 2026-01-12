} catch (err: any) {
  console.error('PIX ERROR FULL:', {
    message: err.message,
    response: err.response?.data,
    status: err.response?.status,
    headers: err.response?.headers,
  })

  return res.status(err.response?.status || 500).json({
    error: err.response?.data || {
      message: err.message,
    },
  })
}

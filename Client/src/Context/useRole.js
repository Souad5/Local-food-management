import { useQuery } from '@tanstack/react-query'
import useAuth from '../Pages/UseAuth'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user.email}`)
      return res.data
    },
  })

  return [data?.role, isLoading]
}

export default useRole

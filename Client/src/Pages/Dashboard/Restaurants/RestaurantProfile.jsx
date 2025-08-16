import LoadingSpinner from "../../../Api/LoadingSpinner"
import useRole from "../../../Context/useRole"
import useAuth from "../../UseAuth"

const RestaurantProfile = () => {
  const { user } = useAuth()
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner />
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=' shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 text-xs text-white bg-lime-500 rounded-full'>
            {role?.toUpperCase()}
          </p>
          
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold  '>
                  {user.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold  '>{user.email}</span>
              </p>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantProfile
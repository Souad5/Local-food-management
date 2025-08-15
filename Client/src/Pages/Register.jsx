import { Link, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload, saveUserInDb } from '../Api/Utilis'
import useAuth from './UseAuth'
import { useState } from 'react'

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const [preview, setPreview] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form?.image?.files[0]

    const imageUrl = await imageUpload(image)

    try {
      const result = await createUser(email, password)
      await updateUserProfile(name, imageUrl)

      const userData = { name, email, image: imageUrl }
      await saveUserInDb(userData)

      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle()
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      }
      await saveUserInDb(userData)
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-2xl backdrop-blur-md  border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold ">Create Account</h1>
          <p className="text-gray-50 mt-1">Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-400 "
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]))
                }
              }}
              className="w-full text-sm cursor-pointer"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-full mt-2 border "
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-400 "
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-400 "
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-lime-500 text-white font-semibold hover:bg-lime-600 transition-all duration-300 cursor-pointer"
          >
            {loading ? <TbFidgetSpinner className="animate-spin mx-auto cursor-pointer" /> : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center gap-2 border  py-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black transition-all duration-300"
        >
          <FcGoogle size={28} />
          <span className="font-medium cursor-pointer">Continue with Google</span>
        </div>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register

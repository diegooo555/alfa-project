import { useForm } from "react-hook-form"
import { useAuth } from "../context/useAuthContext.js"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function LoginPage() {

  const { register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const {user, signIn, isAuthenticated, errors: registerErrors, } = useAuth()

  const navigate = useNavigate()


  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated, navigate])

  console.log(user)
  console.log(isAuthenticated)

  const onSubmit = handleSubmit( async (values) => {
    signIn(values)
  });

  console.log(registerErrors)
  
  return (
    <div className='w-full h-screen p-6 flex justify-center bg-gray-50 dark:bg-gray-900 max-lg:p-4'>
      <form action="" className='w-[40%] h-[90%] flex flex-col items-center justify-around p-6 shadow dark:border dark:border-gray-700 rounded-md bg-white max-md:w-auto'
        onSubmit={onSubmit}>

        <fieldset className='flex items-center justify-center w-full gap-5 max-md:gap-1'>
          <img src="/wolf.png" alt="logo" width="100" height="100" className='max-lg:w-20 max-md:w-16' />
          <h1 className='font-bold text-4xl max-lg:text-3xl max-md:text-2xl'>Inicio de Sesión</h1>
        </fieldset>

        <div className={` ${registerErrors.length > 0 ? 'bg-red-500 p-2 text-white rounded-[0.32rem]':'hidden'}`}>
          {registerErrors.map((error, index) => {
              return(<p key={index}>{error}</p>)
          })}
        </div>

        <fieldset className='w-full flex flex-col items-start px-4 justify-center gap-2 mt-2'>
          <label htmlFor="email" className='font-bold text-xl max-lg:text-sm'>Email</label>
          <input type="email" id='email' {...register('email', { required: true })} placeholder='Email' className='border-solid border-[1px] border-[gray] text-center rounded-[0.32rem] p-1 w-full' autoComplete='email' required/>
          {errors.email && (
            <p className='text-red-500'>El email es requerido</p>
          )}
          <label htmlFor="password" className='font-bold text-xl max-lg:text-sm'>Contraseña:</label>
          <input type="password" id='password' {...register('password', { required: true })} placeholder="••••••••" className='border-solid border-[1px] border-[gray] text-center rounded-[0.32rem] p-1 w-full' autoComplete='new-password' required/>
          {errors.password && (
            <p className='text-red-500'>La contraseña es requerida</p>
          )}
        </fieldset>

        <button type='submit' className='w-[60%] bg-blue-500 p-3 rounded-md hover:bg-blue-700 text-white font-bold max-md:w-auto'>Iniciar Sesión</button>

        <div className="text-center">
          <p>¿No tienes una cuenta?</p>
          <Link to="/register" className="text-blue-500 hover:text-blue-700 font-bold">Registrate</Link>
        </div>
        
      </form>
    </div>
  )
}

export default LoginPage
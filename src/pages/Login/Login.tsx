/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/Features/Auth/authSlice";
import { useLoginMutation } from "../../redux/Features/Auth/authApi";
import TextInput from "../../components/reusable/TextInput/TextInput";

type FormValues = {
  credential: string;
  pin: string;
};

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    const loginData = {
      credential: data.credential,
      pin: data.pin,
    };
    try {
      const res = await login(loginData).unwrap();
      reset();
      const user = res.data.profile;
      const token = res.data.accessToken;
      toast.success("Logged in successfully.");

      // Setting the user in Redux state
      dispatch(setUser({ user, token }));
      navigate("/dashboard");
    } catch (err: any) {
      console.log(err);
      toast.error( "Invalid email or password!");
    }
  };

  return (
    <div className="max-w-125 mx-auto h-screen flex items-center justify-center">
      <form
        className="space-y-6 w-full bg-gray-100 p-6 rounded-xl"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="text-2xl font-semibold text-start">
          Login to access dashboard
        </h1>
        <div className="space-y-4">
          <TextInput
            label="Credential"
            placeholder="Enter credential"
            {...register("credential", { required: "This field is required" })}
            error={errors.credential}
          />

          <TextInput
            label="PIN"
            type={"password"}
            placeholder="Enter your pin"
            {...register("pin", { required: "Pin is required" })}
            error={errors.pin}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

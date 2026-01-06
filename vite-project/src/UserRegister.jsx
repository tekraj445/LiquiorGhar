import { useForm } from "react-hook-form";

const UserRegister=() => {
const{register,handleSubmit,formState:{errors}}=useForm();
console.log(errors);
const onSubmit=(data)=>{
    debugger;
  console.log(errors);
  console.log("Form Values:",data);
};
    return (
    <>   
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName", { required: true })}
        />
        {errors.fullName && <span>This field is required</span>}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phone", { required: true })}
        />
        {errors.phone && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
        />
        {errors.address && <span>This field is required</span>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && <span>This field is required</span>}
        <button type="submit">Register</button>
      </form>
    </>); 
};

export default UserRegister;
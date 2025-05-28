"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DepartmentLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormsFields] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formFields.email,
            password: formFields.password,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // Store everything you need
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("storage")); // Trigger storage event
        toast.success("Login successful!", { id: loadingToast });
        router.push("/add-jobs"); // or your desired page
      } else {
        toast.error(data.error || "Login failed", { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section py-12 h-[65vh] flex items-center justify-center">
      <div className="container">
        <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-gray-800 font-bold">
            Department Login Portal
          </h3>

          <form className="w-full mt-5" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="email"
                name="email"
                value={formFields.email}
                disabled={isLoading}
                label="User Id"
                variant="standard"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow ? "text" : "password"}
                id="password"
                label="User Password"
                variant="standard"
                className="w-full"
                name="password"
                value={formFields.password}
                disabled={isLoading}
                onChange={onChangeInput}
              />
              <Button
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                type="button"
              >
                {isPasswordShow ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="btn-custom btn-lg w-full flex gap-3"
              >
                <span>{isLoading ? "Logging in..." : "Login"}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DepartmentLogin;

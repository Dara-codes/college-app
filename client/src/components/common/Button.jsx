const Button = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
  fullWidth = false,
}) => {
  const baseStyles = "px-6 py-3 rounded-lg transition-colors";
  const variants = {
    primary: "bg-[#0B4C77] text-white hover:bg-opacity-90",
    secondary: "border border-[#0B4C77] text-[#0B4C77] hover:bg-[#0B4C77]/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

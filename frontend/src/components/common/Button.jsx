function Button({ children, onClick, variant = "primary", className = "" }) {
  const base = "px-4 py-2 rounded-lg font-medium transition";

  const styles = {
    primary: "bg-teal-600 text-white hover:bg-teal-700",
    secondary: "border text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className} hover:scale-105 active:scale-95`}
    >
      {children}
    </button>
  );
}

export default Button;
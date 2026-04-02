const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-amber-500 text-white',
    destructive: 'bg-red-500 text-white',
    outline: 'border border-rose-200 text-rose-600',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
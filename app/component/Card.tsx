const Card = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='w-[600px] h-[600px] bg-white rounded-lg border border-dashed overflow-auto'>
      {children}
    </div>
  );
};

export default Card;

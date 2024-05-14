const Card = ({ children, bg = 'bg-gray-100' }) => {
  return <div className={`${bg} p-6 rounded-lg shadow-md border-gray-950 `}>{children}</div>;
};
export default Card;

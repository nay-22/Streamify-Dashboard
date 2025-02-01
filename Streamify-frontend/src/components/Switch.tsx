const Switch = ({ isOn, onClick }: { isOn: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${
        isOn ? "bg-slate-500" : "bg-slate-300"
      }`}
    >
      <div
        className={`absolute left-0.5 top-0.5 h-5 w-5 ${isOn ? 'bg-slate-900' : 'bg-slate-700'} rounded-full transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default Switch;

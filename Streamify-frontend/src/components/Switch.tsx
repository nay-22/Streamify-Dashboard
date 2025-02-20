/**
 * Switch: Functional component that renders a toggle switch UI element.
 * It allows users to toggle between two states (on/off) and
 * provides a visual indication of the current state. The
 * component accepts props to control its state and handle
 * click events.
 *
 * @param props - props object for Switch.
 * @param props.isOn Boolean flag indicating whether the switch
 *                     is currently in the "on" position
 * @param props.onClick Callback function to execute when the switch is
 *                        clicked
 *
 * @returns A JSX element representing a toggle switch
 */
const Switch = ({ isOn, onClick }: { isOn: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${
        isOn ? "bg-slate-500" : "bg-slate-300"
      }`}
    >
      <div
        className={`absolute left-0.5 top-0.5 h-5 w-5 ${
          isOn ? "bg-slate-900" : "bg-slate-700"
        } rounded-full transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default Switch;

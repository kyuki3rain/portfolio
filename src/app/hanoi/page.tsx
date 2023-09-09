import HanoiForm from "./components/Form";
import Tower from "./components/Tower";

export default function Hanoi() {
  return (
    <main className="w-screen flex flex-col items-center justify-between">
      <HanoiForm></HanoiForm>
      <Tower></Tower>
    </main>
  );
}

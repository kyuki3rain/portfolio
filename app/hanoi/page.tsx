import HanoiForm from "./components/Form";
import Game from "./components/Game";

export default function Hanoi() {
  return (
    <main className="w-screen flex flex-col items-center justify-between">
      <HanoiForm></HanoiForm>
      <Game></Game>
    </main>
  );
}

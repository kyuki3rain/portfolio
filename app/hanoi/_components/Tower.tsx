"use client";

type Props = {
  type: string;
  floors: number[];
  onClick: () => void;
  focus: boolean;
  className?: string;
};

const widthClassList = [
  "w-8",
  "w-16",
  "w-24",
  "w-32",
  "w-40",
  "w-48",
  "w-56",
  "w-64",
  "w-72",
  "w-80",
];

export default function Tower({
  type,
  floors,
  onClick,
  focus,
  className,
}: Props) {
  return (
    <div
      className={`flex flex-col-reverse items-center ${className} flex-1 h-96 pt-8`}
      onClick={() => onClick()}
    >
      {floors.flatMap((i, fi) => {
        if (focus && fi === floors.length - 1) {
          return [
            <div key={`${type}-gap`} className="flex-1"></div>,
            <div
              key={`${type}-${i}`}
              className={`${widthClassList[i]} h-8 bg-gray-500`}
            ></div>,
          ];
        } else {
          return [
            <div
              key={`${type}-${i}`}
              className={`${widthClassList[i]} h-8 bg-gray-500`}
            ></div>,
          ];
        }
      })}
    </div>
  );
}

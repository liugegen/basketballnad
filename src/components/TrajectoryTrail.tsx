interface TrajectoryTrailProps {
  trajectory: { x: number; y: number }[];
  ballSize: number;
}

export default function TrajectoryTrail({ trajectory, ballSize }: TrajectoryTrailProps) {
  if (trajectory.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {trajectory.map((point, index) => (
        <div
          key={index}
          className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-30"
          style={{
            left: point.x + ballSize / 2,
            top: point.y + ballSize / 2,
            opacity: (index / trajectory.length) * 0.5
          }}
        />
      ))}
    </div>
  );
}
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const HumanizeTime = ({ time }: { time: Date }) => {
  return (
    <span className="ml-2 text-muted-foreground text-xs">
      {dayjs(time).fromNow()}
    </span>
  );
};

export default HumanizeTime;

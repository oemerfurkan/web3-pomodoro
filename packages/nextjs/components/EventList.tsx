import { EventListItem } from "./EventListItem";
import { BigNumber } from "ethers";

export const EventList = (props: any) => {
  console.log(props.events);

  const items: any =
    props.events &&
    props.events.map((event: any) => (
      // <li>
      //     <span>{event.args._worker}</span>
      //     <span> => </span>
      //     <span>{Number(event.args._time)}</span>
      // </li>
      <EventListItem worker={event.args._worker} time={Number(event.args._time)} />
    ));
  return (
    <div className="text-center h-[620px] overflow-scroll scrollbar-hide rounded-md">
      <ul>{items}</ul>
    </div>
  );
};

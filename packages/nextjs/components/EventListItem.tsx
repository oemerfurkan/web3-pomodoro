export const EventListItem = (props: any) => {
  const minutes = Math.floor(props.time / 60);
  const seconds = props.time % 60;

  return (
    <>
      <li>
        <div className="p-[5px] my-[10px] bg-black shadow-md rounded-xl bg-gray-400 text-gray-700">
          <p>
            <a href={"https://etherscan.io/address/" + props.worker} target="_blank">
            {props.worker}
            </a>
          </p>
          {minutes > 0 ? <span>{minutes}min</span> : null} <span>{seconds}sn</span>
        </div>
      </li>
    </>
  );
};

import FacebookShare from "../molecules/FacebookShare";
import TwitterShare from "../molecules/TwitterShare";

function ShareSns() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <TwitterShare />
        <FacebookShare />
      </div>
    </>
  );
}
export default ShareSns;

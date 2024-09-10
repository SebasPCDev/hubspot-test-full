import { useEffect } from "react";

export default function SpinnerLoading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {}, 5000);
  }, []);
  return (
    <>
      <div>{loading ? <img src="./tube-spinner.svg" /> : <div>Done!</div>}</div>
    </>
  );
}

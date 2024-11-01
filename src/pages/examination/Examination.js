import { useParams } from "react-router-dom";
import HanyangMajorAptitude from "./hanyang-marjor-aptitude/HanyangMajorAptitude";

function Examination() {
  const params = useParams();

  // eslint-disable-next-line default-case
  switch (params.id) {
    case "hanyang-major-aptitude":
      return <HanyangMajorAptitude />;
  }
}

export default Examination;

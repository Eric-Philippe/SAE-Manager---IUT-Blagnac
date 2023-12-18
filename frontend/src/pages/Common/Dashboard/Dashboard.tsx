// Ignore test
import { Status } from "../../../assets/enums/Status.enum";

// Page Content
import StudentInterface from "./interfaces/StudentInterface";
import AdminInterface from "./interfaces/AdminInterface";

export default function Dashboard() {
  if (localStorage.getItem("statut") === Status.ADMIN) {
    return <AdminInterface />;
  } else {
    return <StudentInterface />;
  }
}

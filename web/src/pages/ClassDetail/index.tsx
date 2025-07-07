import { ClassroomLayout, GHeader } from "../../components";
import { useLocation, Outlet } from "react-router";


export default function ClassDetailLayout() {
  const location = useLocation();
  const className = location.state?.className || 'Không có tên lớp';

  return (
    <>
      <GHeader/>
      <ClassroomLayout className={className}>
        <Outlet />
      </ClassroomLayout>
    </>
  );
}
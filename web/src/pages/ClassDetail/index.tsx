import {ClassroomLayout, GHeader} from "../../components";
import {useLocation} from "react-router";


export default () => {
  const location = useLocation();
  const className = location.state?.className || 'Không có tên lớp';

  return (
    <>
      <GHeader/>
      <ClassroomLayout className={className}/>
    </>
  )
}
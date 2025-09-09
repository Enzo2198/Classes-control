import {useNavigate} from "react-router";
import type {Course} from "../../utils";

export function useClassCard() {
  const navigate = useNavigate();

  const onEnterClass = (course: Course) => {
    navigate(`/class/${course.id}`, {
      state: {
        className: course.name
      }
    });
  };

  return { onEnterClass };
}
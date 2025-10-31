import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
  type Exam,
  type ExamGroup, type ExamResult,
  getMethod,
  getValidAccessToken,
  type Member,
  type StudentResultGroup
} from "../../../../utils";
import dayjs from "dayjs";

export default function useTeacherExamGroup() {
  const navigate = useNavigate();
  const {id, examGroupId} = useParams();
  const classId: number = Number(id)
  const handleBackToExamGroupsList = () => {
    navigate(`/class/${id}/exam`)
  }

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const handleEditExamGroup = () => {
    setIsOpenDialog(true);
  }

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteExamGroup = () => {
    setIsDeleting(true)
    setIsOpenDialog(true);
  }

  const handleCreateExam = () => {
    navigate(`/class/${id}/exam/${examGroupId}/0`)
  }

  const handleEditExam = (examId: number) => {
    navigate(`/class/${id}/exam/${examGroupId}/${examId}`)
  }

  const handleMark = (studentId: number) => {
    navigate(`/class/${id}/exam/${examGroupId}/marking?studentId=${studentId}`)
  }

  const [examGroupDetail, setExamGroupDetail] = useState<ExamGroup | undefined>(undefined)
  const [exams, setExams] = useState<Exam[]>([])
  const [students, setStudents] = useState<Member[]>([])
  const [studentResultGroups, setStudentResultGroups] = useState<StudentResultGroup[]>([])

  let examName: string = ''
  let awaitTime: number = 0
  let startTime: string = ''
  if (examGroupDetail) {
    examName = examGroupDetail.name
    awaitTime = Number(examGroupDetail.await_time) / 60
    startTime = dayjs(examGroupDetail.start_time).format('DD-MM-YYYY')
  }

  const onMounted = async () => {
    const accessToken = await getValidAccessToken()
    if (!accessToken) {
      console.error('No valid access token, redirecting to login page')
      navigate('/login')
      return
    }

    try {
      const [examGroupData, examsData, classData] = await Promise.all([
        getMethod(`/exam_groups/${examGroupId}`,
          {headers: {Authorization: `Bearer ${accessToken}`}}
        ),
        getMethod(`/exams/?exam_group_id=${examGroupId}`,
          {headers: {Authorization: `Bearer ${accessToken}`}}
        ),
        getMethod(`/classes/${classId}`,
          {headers: {Authorization: `Bearer ${accessToken}`}}
        ),
      ])

      if (examGroupData) setExamGroupDetail(examGroupData)
      if (examsData) setExams(examsData)

      // Get student from classData
      const studentsData = classData?.students
      if (studentsData) setStudents(studentsData)
    } catch (e) {
      console.error('Fetching data from server failed', e)
    }
  }

  useEffect(() => {
    onMounted()
  }, [classId, examGroupId])

  useEffect(() => {
    const onMountingResults = async () => {
      const accessToken = await getValidAccessToken()
      if (!accessToken) {
        console.error('No valid access token, redirecting to login page')
        navigate('/login')
        return
      }

      try {
        const resultData: ExamResult[][] = await Promise.all(
          students.map(student =>
            getMethod(`/exam_results/?student_id=${student.id}&exam_group_id=${examGroupId}`, {
              headers: {Authorization: `Bearer ${accessToken}`}
            })
          )
        )

        // Add exam results to each student data
        const studentResults = students.map((student: Member, index: number) => {
          return {
            ...student,
            result: resultData[index],
          }
        })

        // Only show students who have taken at least one of the exams
        const notEmptyStudentResults: StudentResultGroup[] = studentResults.filter(
          (studentResults: StudentResultGroup)=> studentResults.result.length > 0
        )
        setStudentResultGroups(notEmptyStudentResults)
      } catch (e) {
        console.error('Fetching data from server failed', e)
      }
    }
    onMountingResults()
  }, [students, examGroupId])

  return {
    handleBackToExamGroupsList,
    examName,
    startTime,
    awaitTime,
    handleEditExamGroup,
    handleDeleteExamGroup,
    handleCreateExam,
    exams,
    handleEditExam,
    studentResultGroups,
    handleMark,
    classId,
    isOpenDialog,
    setIsOpenDialog,
    isDeleting,
    setIsDeleting,
    examGroupDetail,
    onMounted
  }
}
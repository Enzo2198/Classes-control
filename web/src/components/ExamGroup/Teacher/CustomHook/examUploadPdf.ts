import {type ChangeEvent, useEffect, useReducer, useState} from "react";
import {initState, reducer} from "./reducer.ts";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import {type ExamGroup, getMethod, getValidAccessToken} from "../../../../utils";
import {toast} from "react-toastify";

export default function useUploadFile() {
  const [state, dispatch] = useReducer(reducer, initState)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const navigate = useNavigate()
  const {id, examGroupId, examId} = useParams()
  let examGroupIdNum = 0
  let examIdNum = 0
  if (examGroupId !== undefined && examId !== undefined) {
    examGroupIdNum = Number(examGroupId)
    examIdNum = Number(examId)
  }

  const handleBackToExamGroups = () => {
    navigate(`/class/${id}/exam`)
  }

  const handleBackToExamGroupDetail = () => {
    navigate(`/class/${id}/exam/${examGroupId}`)
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) =>{
    const file: File | null = e.target.files?.[0] ?? null
    if (!file) return
    if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
      alert('Vui lòng chọn file PDF hoặc hình ảnh')
      return
    }
    setSelectedFile(file)

    const previewUrl: string = URL.createObjectURL(file)

    const uploadFile = {
      id: null,
      url: previewUrl,
      file_type: file.type.split('/')[1],
    }

    dispatch({type: 'UPLOAD_FILE', payload: uploadFile})
  }

  const [examGroup, setExamGroup] = useState<ExamGroup | null>(null)

  useEffect(() => {
    const onMounted = async () => {
      const accessToken: string | null = await getValidAccessToken();
      if (!accessToken) {
        console.error("No valid access token, redirecting to login page");
        navigate('/login');
        return;
      }

      try {
        // ExamId already exists => edit mode
        if (examIdNum !== 0) {
          const examData = await getMethod(`/exam/${examId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })

          dispatch({type: 'LOAD_INITIAL_DATA', payload: examData})
        }

        const examGroupData = await getMethod(`/exam_groups/${examGroupId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        setExamGroup(examGroupData)
      } catch (err) {
        console.error('Error on loading data:', err)
        toast.error('Có lỗi khi tải dữ liệu!')
      }
      onMounted()
    }
  }, [])

  return {
    handleFileUpload,
    handleBackToExamGroups,
    handleBackToExamGroupDetail,
    examGroup,
    examIdNum,
    state,
    examGroupIdNum,
    dispatch,
    selectedFile
  }
}